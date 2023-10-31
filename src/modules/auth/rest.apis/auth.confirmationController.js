import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import generateToken from '../../../utils/signTokenFunction.js';
import { requestNewStamp } from "../../../utils/generateHTML.js";
import userModel from '../../../../DB/models/user.model.js';
import sendEmail from '../../../utils/sendemail.js';
import verifyToken from '../../../utils/verifyTokenFunction.js';

export const confirmEmail = asyncHandler(async (req, res, next) => {
    const decode = verifyToken(req.params.token, process.env.EMAIL_SIGNATURE)
    const user = await userModel.findByIdAndUpdate(decode.id, { isConfirmed: true })
    return res.status(201).json({ success: true, message: `Your Account Is Activated, Now You Can Login Sir ${user.firstName} ${user.lastName}` })
})
export const newConfirmEmail = asyncHandler(async (req, res, next) => {
    const decode = verifyToken(req.params.newToken, process.env.EMAIL_SIGNATURE)
    const user = await userModel.findById(decode.id)
    if (!user) return next(new Error("Accont Not Found, Go SignUp First Please !"))
    if (user.isConfirmed) return res.status(201).json({ success: true, message: `Your Account Is Activated Successfully, Now You Can Login Sir ${user.firstName} ${user.lastName}` })
    const token = generateToken({ id: user._id }, process.env.EMAIL_SIGNATURE, 60 * 2)
    const html = requestNewStamp(`${req.protocol}://${req.headers.host}/auth/confirmemail/${token}`)
    await sendEmail({ to: user.email, subject: "New Comfirmation Request", html })
    return res.status(200).json({ success: true, message: "Go Check Your Email inBox Again Please" })
})