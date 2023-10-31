import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import isAuthenticated from './../../middleware/authentication.js';
import isAuthorized from './../../middleware/authorization.js';
import { validation } from "../../middleware/validation.js";
import propertiesModel from '../../../DB/models/properties.mode.js'
import slugify from "slugify";
import { nanoid } from "nanoid";
import { createPropertyType, deletePropertyType, getAllPropertiesType, getPropertyByIdType, updatedPropertyType } from "./properties.type.js";
import { createPropertyValidationSchema, deletePropertyValidationSchema, getPropertyByIdValidationSchema, updatePropertyValidationSchema } from "./properties.validation.js";
import countriesModel from './../../../DB/models/countries.model.js';
import subPropertyModel from "../../../DB/models/subProperty.model.js";
import roomsModel from './../../../DB/models/rooms.model.js';

export const createProperty = {
    type: createPropertyType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        countryId: { type: GraphQLID },
        token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication 
        await isAuthorized('admin', user.role) // authorization
        await validation(createPropertyValidationSchema, args) // validation
        const property = await propertiesModel.findOne({ name: args.name }) 
        if (property) throw new Error('Property Name is Duplicated') // check duplicated properties
        const country = await countriesModel.findById(args.countryId)
        if (!country) throw new Error("There is Not Any Available Countries With This Id") // check country id
        const slug = slugify(args.name, '_') // create slug
        const customId = nanoid() // create customId
        const newProperty = await propertiesModel.create({ name: args.name, slug, createdBy: user._id, customId, countryId: args.countryId }) // create property
        return { success: true, message: "Property Added Successfully", newProperty } // response
    }
}
export const updateProperty = {
    type: updatedPropertyType,
    args: {
        token: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        countryId: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization
        await validation(updatePropertyValidationSchema, args) // validation
        const property = await propertiesModel.findById(args.id)
        if (!property) throw new Error("In_Valid Property Id") // check property Id
        if (toString(property.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Update This Property") // check createdBy
        if (property.name === args.name) throw new Error("Property Name is Duplicated") // check duplicated properties
        const country = await countriesModel.findById(args.countryId)
        if (!country) throw new Error("There is Not Any Available Countries With This Id") // check country id
        const slug = slugify(args.name, '_') // create slug
        const updatedProperty = await propertiesModel.findByIdAndUpdate(args.id, { name: args.name, slug, countryId: args.countryId }, { new: true }).populate('countryId') // update property
        return { success: true, message: "Property Updated Successfully", updatedProperty } // response
    }
}
export const deleteProperty = {
    type: deletePropertyType,
    args: {
        token: { type: GraphQLString },
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication 
        await isAuthorized('admin', user.role) // authorization
        await validation(deletePropertyValidationSchema, args) // validation
        const property = await propertiesModel.findById(args.id) 
        if (!property) throw new Error("In_Valid Property Id") // check property Id
        if (toString(property.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Delete This Property") // check createdBy
        const deletedProperty = await propertiesModel.findByIdAndDelete(args.id) // delete property with related Modules
        await subPropertyModel.deleteMany({ propertyId: deletedProperty._id })
        await roomsModel.deleteMany({ propertyId: deletedProperty._id })
        return { success: true, message: "Property Removed Successfully" } // response
    }
}
export const getAllProperties = {
    type: getAllPropertiesType,
    resolve: async () => {
        const properties = await propertiesModel.find({}).populate('countryId') 
        if (!properties) throw new Error("There is No Available Countries") // check properties
        return { success: true, properties } // response
    }
}
export const getPropertyById = {
    type: getPropertyByIdType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        await validation(getPropertyByIdValidationSchema, args)
        const property = await propertiesModel.findById(args.id).populate("countryId") 
        if (!property) throw new Error("There is No Available Property With This Id") // check property 
        return { success: true, property } // response
    }
}