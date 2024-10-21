import express from 'express'
import { registeruser,loginUser, getProfile , updateProfile, bookAppointment, listAppointments, cancelAppoinment, paymentRazorPay, verifyRazorpay} from  '../controllers/UserController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()
userRouter.post('/register', registeruser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'),authUser,updateProfile)
userRouter.post('/book-apponiment', authUser,bookAppointment)
userRouter.get('/user-appointments', authUser, listAppointments)
userRouter.post('/cancel-apponiment', authUser,cancelAppoinment)
userRouter.post('/payment-razorpay', authUser, paymentRazorPay)

userRouter.post('/verifyRazorpay', authUser,verifyRazorpay)

export default userRouter