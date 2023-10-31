import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const createRoomValidationSchema = Joi.object({
    token: globalValidation.token,
    name: globalValidation.firstName,
    description: globalValidation.description,
    roomCapacity: globalValidation.rooms,
    bedCount: globalValidation.token,
    adults: globalValidation.unit,
    children: globalValidation.unit,
    pricePerNight: globalValidation.rooms,
    countryId: globalValidation._id,
    propertyId: globalValidation._id,
    subPropertyId: globalValidation._id,
    rate: globalValidation.rate
}).required()
export const updateRoomValidationSchema = Joi.object({
    token: globalValidation.token,
    id: globalValidation._id,
    name: globalValidation.firstName,
    description: globalValidation.description,
    roomCapacity: globalValidation.rooms,
    bedCount: globalValidation.token,
    adults: globalValidation.unit,
    children: globalValidation.unit,
    pricePerNight: globalValidation.rooms,
    countryId: globalValidation._id,
    propertyId: globalValidation._id,
    subPropertyId: globalValidation._id,
    rate: globalValidation.rate
}).required()
export const deleteRoomValidationSchema = Joi.object({
    id: globalValidation._id,
    token: globalValidation.token
}).required()
export const getRoomByIdValidationSchema = Joi.object({
    id: globalValidation._id
}).required()