import { Types } from "mongoose";
import Joi from "joi";

const idValidation = (value, helpers) => {
    return Types.ObjectId.isValid(value) ? true : helpers.message("In_Valid ID From Validation")
}

export const globalValidation = {
    firstName: Joi.string().min(5).max(20).required(),
    lastName: Joi.string().min(5).max(20).required(),
    userName: Joi.string().alphanum().min(5).max(50).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().pattern((new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))).max(100).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    phone: Joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)).required(),
    age: Joi.number().integer().positive().min(2).required(),
    gender: Joi.string().required(),
    code: Joi.string().length(5).required(),
    _id: Joi.string().custom(idValidation).required(),
    token: Joi.string().required(),
    rooms: Joi.number().integer().positive().required(), // availablerooms,reservedroom,roomCapacity,price
    unit: Joi.number().integer().required(), // adult,children
    rate: Joi.number().required(), // rate
    description: Joi.string().min(20).required()
}

export const validation = async (Schema, args) => {
    const validationResult = Schema.validate(args, { abortEarly: false })
    if (validationResult.error) throw new Error(validationResult.error)
    return;
}

