import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { cancelReservation, createReservation, deleteReservation, getAllReservations } from "../modules/reservation/reservation.merge.js"

const reservationSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Read",
        description: "any field Read",
        fields: {
            ////////////////// GET All Reservations //////////////////
            getAllReservations,
        }
    }),
    mutation: new GraphQLObjectType({
        name: "CUD",
        description: "any field Create,Update or Delete",
        fields: {
            ////////////////// Create Reservation //////////////////
            createReservation,
            ////////////////// Cancel Reservation //////////////////
            cancelReservation,
            ////////////////// Delete Reservation (CheckOut) //////////////////
            deleteReservation,
        }
    })
})

export default reservationSchema