import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const createPropertyValidationSchema = Joi.object({
    name: globalValidation.firstName,
    countryId: globalValidation._id,
    token: globalValidation.token
}).required()
export const updatePropertyValidationSchema = Joi.object({
    name: globalValidation.firstName,
    id: globalValidation._id,
    token: globalValidation.token,
    countryId: globalValidation._id,
}).required()
export const deletePropertyValidationSchema = Joi.object({
    id: globalValidation._id,
    token: globalValidation.token
}).required()
export const getPropertyByIdValidationSchema = Joi.object({
    id: globalValidation._id
}).required()