import mongoose, { Schema, Types, model } from 'mongoose';

const subPropertySchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50,
        unique: true,
        lowercase: true
    },
    slug: {
        type: String,
        min: 5,
        max: 50,
        lowercase: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    customId: String,
    roomsCount: {
        type: Number,
        min: 5,
        required: true
    },
    availableRooms: {
        type: Number,
        min: 1,
        required: true,
    },
    reservedRooms: {
        type: Number,
        required: true,
        default: 0
    },
    countryId: {
        type: Types.ObjectId,
        ref: 'Countries',
        required: true
    },
    propertyId: {
        type: Types.ObjectId,
        ref: 'Properties',
        required: true
    },
    subPropertyImage: {
        url: String,
        id: String,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

const subPropertyModel = mongoose.models.subProperty || model('subProperty', subPropertySchema)
export default subPropertyModel
