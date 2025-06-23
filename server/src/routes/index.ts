import { Router } from 'express'
import authRoutes from '../modules/auth/auth.routes'
import userRoutes from '../modules/user/user.routes'
import cargoRoutes from '../modules/cargo/cargo.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/cargos', cargoRoutes)

export default router
