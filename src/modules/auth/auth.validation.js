import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const signupValidationSchema = Joi.object({
    firstname: globalValidation.firstName,
    lastname: globalValidation.lastName,
    username: globalValidation.userName,
    email: globalValidation.email,
    password: globalValidation.password,
    confirmPassword: globalValidation.confirmPassword,
    phone: globalValidation.phone,
    age: globalValidation.age,
    gender: globalValidation.gender
}).required()
export const signinValidationSchema = Joi.object({
    email: globalValidation.email,
    password: globalValidation.password,
}).required()
export const resetPassEmailValidationSchema = Joi.object({
    email: globalValidation.email,
}).required()
export const resetPassCodeValidationSchema = Joi.object({
    code: globalValidation.code,
}).required()