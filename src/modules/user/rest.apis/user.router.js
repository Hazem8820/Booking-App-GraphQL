import isAuthenticated from '../../../middleware/rest.apis/authentication.js';
import { fileUpload, extensionValidation } from '../../../utils/multer.cloud.js'
import * as USC from "./user.controller.js"
import { Router } from "express";

const router = Router()

router.patch('/profile', isAuthenticated, fileUpload(extensionValidation.image).single('image'), USC.profilePic)
router.patch('/cover', isAuthenticated, fileUpload(extensionValidation.image).array('image'), USC.coverPic)
router.delete('/deletecover', isAuthenticated, fileUpload(extensionValidation.image).array('image'), USC.deleteCover)

export default router 