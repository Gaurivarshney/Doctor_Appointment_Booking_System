import express from 'express'
import { addDoctor,adminDashboard,allDoctors,appoinmentCancel,appointmentsAdmin,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter= express.Router()
adminRouter.post('/add-doctor', authAdmin, upload.single('image'),addDoctor)
// adminRouter.get('/appointments-admin',authAdmin,appointmentsAdmin)
// adminRouter.post('/cancel-appointment',authAdmin,appoinmentCancel)
// adminRouter.get('/dashboard',authAdmin,adminDashboard)
// adminRouter.post('/login',authAdmin,loginAdmin)
export default adminRouter