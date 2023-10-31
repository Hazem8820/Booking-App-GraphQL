import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import isAuthenticated from './../../middleware/authentication.js';
import { validation } from "../../middleware/validation.js";
import { createReservationValidationSchema, deleteReservationValidationSchema } from "./reservation.validation.js";
import reservationModel from "../../../DB/models/reservation.model.js";
import countriesModel from "../../../DB/models/countries.model.js";
import propertiesModel from "../../../DB/models/properties.mode.js";
import subPropertyModel from "../../../DB/models/subProperty.model.js";
import roomsModel from "../../../DB/models/rooms.model.js";
import { cancelReservationType, createReservationType, deleteReservationType, getAllReservationType } from "./reservation.type.js";
import isAuthorized from './../../middleware/authorization.js';

export const createReservation = {
    type: createReservationType,
    args: {
        token: { type: GraphQLString },
        nationality: { type: GraphQLString },
        nightCount: { type: GraphQLInt },
        arrival_Date: { type: GraphQLString },
        countryId: { type: GraphQLID },
        propertyId: { type: GraphQLID },
        subPropertyId: { type: GraphQLID },
        roomId: { type: GraphQLID },
        adults: { type: GraphQLInt },
        kids: { type: GraphQLInt },
        paymentMethod: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args)
        await validation(createReservationValidationSchema, args)
        const { nationality, nightCount, arrival_Date, countryId, propertyId, subPropertyId, roomId, adults, kids, paymentMethod } = args
        const reservation = await reservationModel.findOne({ roomId: roomId, status: "Booked", departure_Date: { $gt: Date.now() } })
        if (reservation) throw new Error("Sorry This Room is Booked") // check Available Rooms
        const country = countriesModel.findById(countryId)
        if (!country) throw new Error("There is Not Any Available Countries With This Id") // check country's id
        const property = await propertiesModel.findById(propertyId)
        if (!property) throw new Error("There is Not Any Available Properties With This Id") // check property's id
        const subProperty = await subPropertyModel.findById(subPropertyId)
        if (!subProperty) throw new Error("There is Not Any Available subProperty With This Id") // check subProperty's id
        const room = await roomsModel.findById(roomId)
        if (!room) throw new Error("There is Not Any Available Room With This Id") // check Room's id
        if (room.roomCapacity < adults + (kids / 2)) throw new Error(`Room Capacity is Only ${room.roomCapacity}`) // room capacity 
        const totalPrice = room.pricePerNight * nightCount // total price
        const departure_Date = new Date(arrival_Date).getTime() + (nightCount * 86400000) // Reservation Expire Date
        const newReservation = await reservationModel.create({ user: user._id, nationality, nightCount, arrival_Date: new Date(arrival_Date).getTime(), departure_Date, countryId, propertyId, subPropertyId, roomId, adults, kids, totalPrice, status: "Booked", payment: paymentMethod }) // create Reservation
        return { success: true, message: "Your Reservation Submitted Successfully", newReservation }
    }
}
export const getAllReservations = {
    type: getAllReservationType,
    resolve: async () => {
        const reservations = await reservationModel.find({}).populate([
            {
                path: "user"
            },
            {
                path: "countryId"
            },
            {
                path: 'propertyId'
            },
            {
                path: 'subPropertyId'
            },
            {
                path: 'roomId'
            }
        ])
        return { success: true, reservations }
    }
}
export const deleteReservation = {
    type: deleteReservationType,
    args: {
        id: { type: GraphQLID },
        token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization 
        await validation(deleteReservationValidationSchema, args) // validation
        const reservation = await reservationModel.findById(args.id)
        if (!reservation) throw new Error("In_Valid Reservation Id") // check reservation id
        if (toString(reservation.user) !== toString(user._id)) throw new Error("You Are Not Authorized To Delete This Reservation") // check createdBy
        await reservationModel.findByIdAndDelete(args.id) // delete reservation
        return { success: true, message: "Reservation Removed Successfully" } // resonse
    }
}
export const cancelReservation = {
    type: cancelReservationType,
    args: {
        id: { type: GraphQLID },
        token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await isAuthorized('admin', user.role) // authorization 
        await validation(deleteReservationValidationSchema, args) // validation
        const reservation = await reservationModel.findById(args.id)
        if (!reservation) throw new Error("In_Valid Reservation Id") // check reservation id
        if (toString(reservation.user) !== toString(user._id)) throw new Error("You Are Not Authorized To Cancel This Reservation") // check createdBy
        await reservationModel.findByIdAndUpdate(args.id, { status: "Cancelled" }) // cancel reservation
        return { success: true, message: "Reservation Cancelled Successfully" } // resonse
    }
}