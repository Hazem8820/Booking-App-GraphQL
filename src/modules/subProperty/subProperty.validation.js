import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const createSubPropertyValidationSchema = Joi.object({
    name: globalValidation.firstName,
    roomsCount: globalValidation.rooms,
    availableRooms: globalValidation.rooms,
    reservedRooms: globalValidation.rooms,
    countryId: globalValidation._id,
    propertyId: globalValidation._id,
    token: globalValidation.token
}).required()
export const updateSubPropertyValidationSchema = Joi.object({
    name: globalValidation.firstName,
    roomsCount: globalValidation.rooms,
    availableRooms: globalValidation.rooms,
    reservedRooms: globalValidation.rooms,
    id: globalValidation._id,
    token: globalValidation.token,
    countryId: globalValidation._id,
    propertyId: globalValidation._id,
}).required()
export const deleteSubPropertyValidationSchema = Joi.object({
    id: globalValidation._id,
    token: globalValidation.token
}).required()
export const getSubPropertyByIdValidationSchema = Joi.object({
    id: globalValidation._id
}).required()