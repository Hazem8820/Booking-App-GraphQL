import mongoose, { Schema, Types, model } from 'mongoose';

const countriesSchema = new Schema({
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
    countryImage: {
        url: String,
        id: String,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },)

const countriesModel = mongoose.models.Countries || model('Countries', countriesSchema)
export default countriesModel
