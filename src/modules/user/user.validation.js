import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const getByIdValidationSchema = Joi.object({
    id: globalValidation._id
}).required()
export const updateUserValidationSchema = Joi.object({
    token: globalValidation.token,
    firstName: globalValidation.firstName,
    lastName: globalValidation.lastName,
    userName: globalValidation.userName,
    email: globalValidation.email,
    phone: globalValidation.phone,
    age: globalValidation.age,
}).required()
export const deleteUserValidationSchema = Joi.object({
    token: globalValidation.token,
}).required()
export const changePassValidationSchema = Joi.object({
    token: globalValidation.token,
    currentPassword: globalValidation.password,
    newPassword: globalValidation.password,
    confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
}).required()