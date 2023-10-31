import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const createCountryValidationSchema = Joi.object({
    name: globalValidation.firstName,
    token: globalValidation.token
}).required()
export const updateCountryValidationSchema = Joi.object({
    name: globalValidation.firstName,
    id: globalValidation._id,
    token: globalValidation.token
}).required()
export const deleteCountryValidationSchema = Joi.object({
    id: globalValidation._id,
    token: globalValidation.token
}).required()
export const getCountryByIdValidationSchema = Joi.object({
    id: globalValidation._id
}).required()