import mongoose, { Schema, Types, model } from 'mongoose'

const reservationSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a valid User ID']
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required'],
    },
    nightCount: {
        type: Number,
        required: true
    },
    arrival_Date: {
        type: Number,
        required: true
    },
    departure_Date: {
        type: Number,
        required: true
    },
    countryId: {
        type: Types.ObjectId,
        ref: "Countries",
        required: true
    },
    propertyId: {
        type: Types.ObjectId,
        ref: "Properties",
        required: true
    },
    subPropertyId: {
        type: Types.ObjectId,
        ref: "subProperty",
        required: true
    },
    roomId: {
        type: Types.ObjectId,
        ref: "Rooms",
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    kids: {
        type: Number,
        required: true
    },
    totalPrice: Number,
    status: {
        type: String,
        enum: ['Booked', 'Cancelled'],
        required: true
    },
    payment: {
        type: String,
        enum: ['Cash', 'Visa'],
        default: 'Cash'
    }
}, { timestamps: true })

const reservationModel = mongoose.models.Reservation || model('Reservation', reservationSchema)
export default reservationModel