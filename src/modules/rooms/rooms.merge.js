import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import isAuthenticated from './../../middleware/authentication.js';
import isAuthorized from './../../middleware/authorization.js';
import { createRoomValidationSchema, deleteRoomValidationSchema, getRoomByIdValidationSchema, updateRoomValidationSchema } from "./rooms.validation.js";
import { validation } from "../../middleware/validation.js";
import roomsModel from "../../../DB/models/rooms.model.js";
import countriesModel from './../../../DB/models/countries.model.js';
import propertiesModel from "../../../DB/models/properties.mode.js";
import subPropertyModel from "../../../DB/models/subProperty.model.js";
import { createRoomType, deleteRoomType, getAllRoomsType, getRoomByIdType, updateRoomType } from "./rooms.type.js";

export const createRoom = {
    type: createRoomType,
    args: {
        token: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        roomCapacity: { type: GraphQLInt },
        bedCount: { type: GraphQLString },
        adults: { type: GraphQLInt },
        children: { type: GraphQLInt },
        pricePerNight: { type: GraphQLInt },
        countryId: { type: GraphQLID },
        propertyId: { type: GraphQLID },
        subPropertyId: { type: GraphQLID },
        rate: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization
        await validation(createRoomValidationSchema, args) // validation
        const { name, description, roomCapacity, bedCount, adults, children, pricePerNight, countryId, propertyId, subPropertyId, rate } = args // data
        const room = await roomsModel.findOne({ name })
        if (room) throw new Error('Room Name is Duplicated') // check duplicated rooms
        const country = countriesModel.findById(countryId)
        if (!country) throw new Error("There is Not Any Available Countries With This Id") // check country's id
        const property = await propertiesModel.findById(propertyId)
        if (!property) throw new Error("There is Not Any Available Properties With This Id") // check property's id
        const subProperty = await subPropertyModel.findById(subPropertyId)
        if (!subProperty) throw new Error("There is Not Any Available subProperty With This Id") // check subProperty's id
        if (roomCapacity < adults + (children / 2)) throw new Error(`Room Capacity is Only ${roomCapacity}`) // room capacity
        const newRoom = await roomsModel.create({ name, description, roomCapacity, bedCount, adults, children, pricePerNight, createdBy: user._id, countryId, propertyId, subPropertyId, rate }) // create room
        return { success: true, message: "Room Created Successfully", newRoom } // response
    }
}
export const updateRoom = {
    type: updateRoomType,
    args: {
        token: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        roomCapacity: { type: GraphQLInt },
        bedCount: { type: GraphQLString },
        adults: { type: GraphQLInt },
        children: { type: GraphQLInt },
        pricePerNight: { type: GraphQLInt },
        countryId: { type: GraphQLID },
        propertyId: { type: GraphQLID },
        subPropertyId: { type: GraphQLID },
        rate: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization 
        await validation(updateRoomValidationSchema, args) // validation
        const { id, name, description, roomCapacity, bedCount, adults, children, pricePerNight, countryId, propertyId, subPropertyId, rate } = args // data
        const room = await roomsModel.findById(id)
        if (!room) throw new Error('In-Valid Room Id') // check room's id
        if (toString(room.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Update This Room") // check createdBy
        if (room.name === args.name) throw new Error("Room Name is Duplicated") // check duplicated rooms
        const country = countriesModel.findById(countryId)
        if (!country) throw new Error("There is Not Any Available Countries With This Id") // check country's id
        const property = await propertiesModel.findById(propertyId)
        if (!property) throw new Error("There is Not Any Available Properties With This Id") // check property's id
        const subProperty = await subPropertyModel.findById(subPropertyId)
        if (!subProperty) throw new Error("There is Not Any Available subProperty With This Id") // check subProperty's id
        if (roomCapacity < adults + (children / 2)) throw new Error(`Room Capacity is Only ${roomCapacity}`) // room capacity
        const newRoom = await roomsModel.findByIdAndUpdate(args.id, { name, description, roomCapacity, bedCount, adults, children, pricePerNight, countryId, propertyId, subPropertyId, rate }).populate([{ path: "countryId" }, { path: "propertyId" }, { path: "subPropertyId" }]) // update room
        return { success: true, message: "Room Updated Successfully", newRoom } // response
    }
}
export const deleteRoom = {
    type: deleteRoomType,
    args: {
        id: { type: GraphQLID },
        token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization 
        await validation(deleteRoomValidationSchema, args) // validation
        const room = await roomsModel.findById(args.id) 
        if (!room) throw new Error("In_Valid Room Id") // check room id
        if (toString(room.createdBy) !== toString(user._id)) throw new Error("You Are Not Authorized To Delete This Room") // check createdBy
        await roomsModel.findByIdAndDelete(args.id) // delete room
        return { success: true, message: "Room Removed Successfully" } // resonse
    }
}
export const getAllRooms = {
    type: getAllRoomsType,
    resolve: async () => {
        const rooms = await roomsModel.find({}).populate([
            {
                path: "countryId"
            },
            {
                path: 'propertyId'
            },
            {
                path: 'subPropertyId'
            }
        ])
        return { success: true, rooms }
    }
}
export const getRoomById = {
    type: getRoomByIdType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        await validation(getRoomByIdValidationSchema, args)
        const room = await roomsModel.findById(args.id).populate([
            {
                path: "countryId"
            },
            {
                path: "propertyId"
            },
            {
                path: "subPropertyId"
            }
        ])
        if (!room) throw new Error("There is No Available Room With This Id") // check room id
        return { success: true, room }
    }
}
