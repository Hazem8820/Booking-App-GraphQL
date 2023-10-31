import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import userModel from './../../../../DB/models/user.model.js';
import cloudinary from './../../../utils/cloudinary.js';

//////////////////////////////////////////////////////////////////// Upload Profile Picture /////////////////////////////////////////////////////////////////////////////////////
export const profilePic = asyncHandler(async (req, res, next) => {
    if (!req.file) return next(new Error('Please Upload Pictures'), { cause: 400 })
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `Booking/users/${req.user._id}/profile` })
    const user = await userModel.findByIdAndUpdate(req.user._id, { profileImage: { url: secure_url, id: public_id } }, { new: true })
    if (!user) {
        await cloudinary.uploader.destroy(public_id)
        return res.status(404).json({ success: false, message: 'User Not Found' })
    }
    return res.status(200).json({ success: true, message: 'Picture Uploaded Successfully', user })
})
//////////////////////////////////////////////////////////////////// Upload Cover Pictures /////////////////////////////////////////////////////////////////////////////////////
export const coverPic = asyncHandler(async (req, res, next) => {
    const coverPics = []
    for (let i = 0; i < req.files.length; i++) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files[i].path, { folder: `Booking/users/${req.user._id}/cover` })
        coverPics.push({ url: secure_url, id: public_id })
    }
    const user = await userModel.findByIdAndUpdate(req.user._id, { coverImages: coverPics }, { new: true })
    if (!user.coverImages.length) return next(new Error('Please Upload Some Pictures', { cause: 400 }))
    return res.status(200).json({ success: true, user })
})
//////////////////////////////////////////////////////////////////// Delete Cover /////////////////////////////////////////////////////////////////////////////////////
export const deleteCover = asyncHandler(async (req, res, next) => {
    const user = req.user
    if (user.coverImages) {
        for (const pic of user.coverImages) { await cloudinary.api.delete_resources(pic.id) }
    }
    user.coverImages = []
    await user.save()
    return res.status(200).json({ success: true, message: "Pictures have Successfully Removed", user: req.user })
})