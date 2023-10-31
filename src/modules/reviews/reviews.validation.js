import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const createReviewValidationSchema = Joi.object({
    token: globalValidation.token,
    roomId: globalValidation._id,
    content: globalValidation.description
}).required()
export const updateReviewValidationSchema = Joi.object({
    token: globalValidation.token,
    id: globalValidation._id,
    content: globalValidation.description
}).required()
export const deleteReviewValidationSchema = Joi.object({
    token: globalValidation.token,
    roomId: globalValidation._id,
    id: globalValidation._id
}).required()
export const getReviewByIdValidationSchema = Joi.object({
    id: globalValidation._id
}).required()