import mongoose, { Schema, Types, model } from 'mongoose'

const roomsSchema = new Schema({
    name: {
        type: String,
        min: 3,
        max: 20,
        required: true,
        lowercase: true
    },
    description: String,
    images: [{ url: String, id: String }],
    roomCapacity: {
        type: Number,
        min: 2,
        required: true
    },
    bedCount: {
        type: String,
        enum: ["Single", "Double", "Triple"],
        required: true
    },
    adults: {
        type: Number,
        min: 1,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    pricePerNight: {
        type: Number,
        min: 2,
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
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
    rate: {
        type: Number,
        min: 0,
        max: 10
    },
    reviews: [{ id: { ref: 'Reviews', type: Types.ObjectId } }]
}, { timestamps: true })

const roomsModel = mongoose.models.Rooms || model("Rooms", roomsSchema)
export default roomsModel