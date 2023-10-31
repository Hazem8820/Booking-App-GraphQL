import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import isAuthenticated from './../../middleware/authentication.js';
import isAuthorized from './../../middleware/authorization.js';
import { validation } from "../../middleware/validation.js";
import { createCountryValidationSchema, deleteCountryValidationSchema, getCountryByIdValidationSchema, updateCountryValidationSchema } from "./countries.validation.js";
import countriesModel from '../../../DB/models/countries.model.js'
import slugify from "slugify";
import { nanoid } from "nanoid";
import { createCountryType, deleteCountryType, getAllCountriesType, getCountryByIdType, updatedCountryType } from "./countries.type.js";
import propertiesModel from './../../../DB/models/properties.mode.js';
import subPropertyModel from "../../../DB/models/subProperty.model.js";
import roomsModel from './../../../DB/models/rooms.model.js';

export const createCountry = {
    type: createCountryType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization
        await validation(createCountryValidationSchema, args) // validation
        const country = await countriesModel.findOne({ name: args.name })
        if (country) throw new Error('Country Name is Duplicated') // check duplicated countries
        const slug = slugify(args.name, '_') // create slug
        const customId = nanoid() // create customId for Cloudinary Folder
        const newCountry = await countriesModel.create({ name: args.name, slug, createdBy: user._id, customId }) // create Country
        return { success: true, message: "Country Added Successfully", newCountry } // response
    }
}
export const updateCountry = {
    type: updatedCountryType,
    args: {
        token: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication 
        await isAuthorized('admin', user.role)  // authorization
        await validation(updateCountryValidationSchema, args) // validation
        const country = await countriesModel.findById(args.id)
        if (!country) throw new Error("In_Valid Country Id") // check country id
        if (toString(country.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Update This Country") // check createdBy
        if (country.name === args.name) throw new Error("Country Name is Duplicated") // check duplicated country
        const slug = slugify(args.name, '_') // create slug
        const updatedCountry = await countriesModel.findByIdAndUpdate(args.id, { name: args.name, slug }, { new: true }); // update country
        return { success: true, message: "Country Updated Successfully", updatedCountry } //response
    }
}
export const deleteCountry = {
    type: deleteCountryType,
    args: {
        token: { type: GraphQLString },
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization
        await validation(deleteCountryValidationSchema, args) // validation
        const country = await countriesModel.findById(args.id)
        if (!country) throw new Error("In_Valid Country Id") // check country id
        if (toString(country.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Delete This Country") // check createdBy
        const deletedCountry = await countriesModel.findByIdAndDelete(args.id)  // delete country with related modules
        await propertiesModel.deleteMany({ countryId: deletedCountry._id })
        await subPropertyModel.deleteMany({ countryId: deletedCountry._id })
        await roomsModel.deleteMany({ countryId: deletedCountry._id })
        return { success: true, message: "Country Removed Successfully" }
    }
}
export const getAllCountries = {
    type: getAllCountriesType,
    resolve: async () => {
        const countries = await countriesModel.find({})
        if (!countries) throw new Error("There is No Available Countries") // check available countries
        return { success: true, countries }
    }
}
export const getCountryById = {
    type: getCountryByIdType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        await validation(getCountryByIdValidationSchema, args) // validation
        const country = await countriesModel.findById(args.id)
        if (!country) throw new Error("There is No Available Country With This Id") // check country Id
        return { success: true, country } //response
    }
}