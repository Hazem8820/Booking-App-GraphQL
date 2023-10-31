import Joi from "joi";
import { globalValidation } from './../../middleware/validation.js';

export const createReservationValidationSchema = Joi.object({
    token: globalValidation.token,
    nationality: globalValidation.token,
    nightCount: globalValidation.rooms,
    arrival_Date: globalValidation.token,
    countryId: globalValidation._id,
    propertyId: globalValidation._id,
    subPropertyId: globalValidation._id,
    roomId: globalValidation._id,
    adults: globalValidation.unit,
    kids: globalValidation.unit,
    paymentMethod: globalValidation.token
}).required()
export const deleteReservationValidationSchema = Joi.object({
    id: globalValidation._id,
    token: globalValidation.token
}).required()