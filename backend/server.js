import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/doctorRoute.js'
import { adminDashboard, allDoctors, appoinmentCancel, appointmentsAdmin, loginAdmin } from './controllers/adminController.js'

import { changeAvailability } from './controllers/doctorController.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app= express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

app.use(cors())

app.use('/api/admin',adminRouter)
app.post('/api/admin/login', loginAdmin);
app.post('/api/admin/all-doctors', allDoctors);
app.post('/api/admin/change-availability', changeAvailability);
app.post('/api/admin/cancel-appointment', appoinmentCancel);
app.get('/api/admin/appointments-admin', appointmentsAdmin)
app.get('/api/admin/dashboard', adminDashboard)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
// app.get('/api/admin/appointments-admin',appointmentsAdmin)

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port,()=> console.log("Server Started", port))