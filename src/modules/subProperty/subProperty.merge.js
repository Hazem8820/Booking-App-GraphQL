import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import isAuthenticated from "../../middleware/authentication.js";
import { createSubPropertyValidationSchema, deleteSubPropertyValidationSchema, getSubPropertyByIdValidationSchema, updateSubPropertyValidationSchema } from "./subProperty.validation.js";
import subPropertyModel from "../../../DB/models/subProperty.model.js";
import countriesModel from "../../../DB/models/countries.model.js";
import propertiesModel from "../../../DB/models/properties.mode.js";
import { createSubPropertyType, deleteSubPropertyType, getAllSubPropertiesType, getSubPropertyByIdType, updateSubPropertyType } from "./subProperty.type.js";
import isAuthorized from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { nanoid } from "nanoid";
import slugify from "slugify";
import roomsModel from './../../../DB/models/rooms.model.js';

export const createSubProperty = {
    type: createSubPropertyType,
    args: {
        token: { type: GraphQLString },
        name: { type: GraphQLString },
        roomsCount: { type: GraphQLInt },
        availableRooms: { type: GraphQLInt },
        reservedRooms: { type: GraphQLInt },
        countryId: { type: GraphQLID },
        propertyId: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization
        await validation(createSubPropertyValidationSchema, args) // validation
        const subProperty = await subPropertyModel.findOne({ name: args.name })
        if (subProperty) throw new Error('subProperty Name is Duplicated') // check diplicated subProperty
        const country = await countriesModel.findById(args.countryId)
        if (!country) throw new Error("There is Not Any Available Countries With This Id") // check country Id
        const property = await propertiesModel.findById(args.propertyId)
        if (!property) throw new Error("There is Not Any Available Properties With This Id") // check property Id
        if (args.roomsCount < (args.availableRooms + args.reservedRooms)) throw new Error(`There is Only ${args.roomsCount} in This ${args.name}`) // rooms system
        const slug = slugify(args.name, '_') // create slug
        const customId = nanoid() // create custom id
        const newSubProperty = await subPropertyModel.create({ name: args.name, slug, createdBy: user._id, customId, roomsCount: args.roomsCount, availableRooms: args.availableRooms, reservedRooms: args.reservedRooms, countryId: args.countryId, propertyId: args.propertyId }) // create subProperty
        return { success: true, message: "subProperty Added Successfully", newSubProperty } // reponse
    }
}
export const updateSubProperty = {
    type: updateSubPropertyType,
    args: {
        token: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        roomsCount: { type: GraphQLInt },
        availableRooms: { type: GraphQLInt },
        reservedRooms: { type: GraphQLInt },
        countryId: { type: GraphQLID },
        propertyId: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization
        await validation(updateSubPropertyValidationSchema, args) // validation
        const subProperty = await subPropertyModel.findById(args.id)
        if (!subProperty) throw new Error("In_Valid subProperty Id")
        if (toString(subProperty.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Update This subProperty") // check createdBy
        if (subProperty.name === args.name) throw new Error("subProperty Name is Duplicated") // check diplicated subProperty
        const country = await countriesModel.findById(args.countryId)
        if (!country) throw new Error("There is Not Any Available Countries With This Id") // check country Id
        const property = await propertiesModel.findById(args.propertyId)
        if (!property) throw new Error("There is Not Any Available Properties With This Id") // check property Id
        if (args.roomsCount < (args.availableRooms + args.reservedRooms)) throw new Error(`There is Only ${args.roomsCount} in This ${args.name}`) // rooms system
        const slug = slugify(args.name, '_') // create slug
        const updatedSubProperty = await subPropertyModel.findByIdAndUpdate(args.id, { name: args.name, slug, roomsCount: args.roomsCount, availableRooms: args.availableRooms, reservedRooms: args.reservedRooms, countryId: args.countryId, propertyId: args.propertyId }, { new: true }).populate([
            {
                path: "countryId"
            },
            {
                path: 'propertyId'
            }
        ])
        return { success: true, message: "subProperty Updated Successfully", updatedSubProperty } // response
    }
}
export const deleteSubProperty = {
    type: deleteSubPropertyType,
    args: {
        id: { type: GraphQLID },
        token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization
        await validation(deleteSubPropertyValidationSchema, args) // validation
        const subProperty = await subPropertyModel.findById(args.id)
        if (!subProperty) throw new Error("In_Valid subProperty Id") // check subProperty
        if (toString(subProperty.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Delete This subProperty") // check createdBy
        const deletedSubProperty = await subPropertyModel.findByIdAndDelete(args.id) // delete subProperty with related modules
        await roomsModel.deleteMany({ subPropertyId: deletedSubProperty._id })
        return { success: true, message: "subProperty Removed Successfully" } // response
    }
}
export const getAllSubProperties = {
    type: getAllSubPropertiesType,
    resolve: async () => {
        const subProperties = await subPropertyModel.find({}).populate([
            {
                path: "countryId"
            },
            {
                path: 'propertyId'
            }
        ])
        return { success: true, subProperties }
    }
}
export const getSubPropertyById = {
    type: getSubPropertyByIdType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        await validation(getSubPropertyByIdValidationSchema, args)
        const subProperty = await subPropertyModel.findById(args.id).populate([
            {
                path: "countryId"
            },
            {
                path: "propertyId"
            }
        ])
        if (!subProperty) throw new Error("There is No Available subProperty With This Id") // check subProperty id 
        return { success: true, subProperty }
    }
}

