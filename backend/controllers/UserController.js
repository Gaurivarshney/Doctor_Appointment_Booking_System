import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorsModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
//API to register user

const registeruser = async (req, res)=>{
    try {
        const {name, email, password}= req.body

        if(!name || !email || !password){
            return res.json({success: false, message: "Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Enter a valid Email"})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Enter a strong password"})
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData ={
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user= await newUser.save()
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


//API for user login

const loginUser= async(req, res)=>{
    try {
        const {email, password}= req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Credentials"})

        }


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const getProfile=async(req,res)=>{
    try {
        const {userId}= req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const updateProfile = async(req, res)=>{
    try {
        const {userId, name , phone, address, dob , gender} = req.body
        const imageFile = req.file
        if(!name || !phone || !dob || !gender){
            return res.json({success:false, message:'Data Missing'})
        }
        await userModel.findByIdAndUpdate(userId,{name, phone, address:JSON.parse(address), dob, gender})
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl= imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, {image:imageUrl})
        }

        res.json({success:true, message: 'Profile Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//Api to book Appointment
const bookAppointment = async(req,res)=>{
    try {
        const {userId, docId, slotDate, slotTime}= req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success: false, message: 'Doctor not available'})
        }
        let slots_booked = docData.slots_booked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: 'Slot not available'})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]= []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appoinmentData ={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment =new appointmentModel(appoinmentData)
        await newAppointment.save()

        //save new slots data in docdata
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success: true, message:"Appoinment Booked"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) 
    }
}


//api to get user appointment

const listAppointments = async(req,res)=>{
    try {
       const {userId}= req.body
       const appointments = await appointmentModel.find({userId})
       res.json({success:true, appointments}) 
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) 
    }
}

//Cancel Appointment
const cancelAppoinment=async(req,res)=>{
    try {
        const {userId, appointmentId}= req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        // verify appointment user
        if(appointmentData.userId!==userId){
            return res.json({success:false, message:'Unauthorized Action'})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing doctor slots after cancel appoinment
        const {docId,slotDate,slotTime}= appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked =doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=> e!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true, message:'Appoinment Cancelled'})



    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) 
    }
}

const razorpayInstance = new razorpay({
    key_id:'rzp_test_uqA4rf2fm9aen6',
    key_secret:'NfQ87pqxg0ngFLOplc8kEX0y'
})

const paymentRazorPay = async (req,res)=>{
    try {
        const {appointmentId} = req.body
    const appointmentData= await appointmentModel.findById(appointmentId)

    if(!appointmentData || appointmentData.cancelled){
        return res.json({success: false, message: "Appoinment cancelled or not found"})
    }

    // creating options for razor pay
    const options={
        amount: appointmentData.amount*100,
        currency:process.env.CURRENCY,
        receipt: appointmentId
    }
    const order = await razorpayInstance.orders.create(options)

    res.json({success:true, order})
    }catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) 
    }
}

//Api to verify payment of razorpay
const verifyRazorpay = async(req,res)=>{
    try {
        const {razorpay_order_id}= req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo)

        if(orderInfo.status==='paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            res.json({success: true, message:"Payment Successful"})
        }else{
            res.json({success: false, message:"Payment Failed ☹️"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) 
    }
}

export {registeruser,loginUser, getProfile, updateProfile, bookAppointment, listAppointments,cancelAppoinment, paymentRazorPay,verifyRazorpay}