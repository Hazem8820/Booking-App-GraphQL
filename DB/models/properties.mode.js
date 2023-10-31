import mongoose, { Schema, Types, model } from 'mongoose';

const propertiesSchema = new Schema({
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
    propertyImage: {
        url: String,
        id: String
    },
    countryId: {
        type: Types.ObjectId,
        ref: 'Countries',
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


const propertiesModel = mongoose.models.Properties || model('Properties', propertiesSchema)
export default propertiesModel
