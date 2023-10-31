import * as AC from './auth.confirmationController.js'
import { Router } from 'express'
const router = Router()
router.get('/confirmemail/:token', AC.confirmEmail)
router.get('/newconfirmemail/:newToken', AC.newConfirmEmail)
export default router