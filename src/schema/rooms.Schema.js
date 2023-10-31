import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createRoom, getAllRooms, updateRoom, deleteRoom, getRoomById } from "../modules/rooms/rooms.merge.js";

const roomsSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Read",
        description: "any field Read",
        fields: {
            ////////////////////// Get All Room ////////////////////
            getAllRooms,
            ////////////////////// Get Room By Id ////////////////////
            getRoomById,
        }
    }),
    mutation: new GraphQLObjectType({
        name: "CUD",
        description: "any field Create,Update or Delete",
        fields: {
            ////////////////////// Create Room ////////////////////
            createRoom,
            ////////////////////// Update Room ////////////////////
            updateRoom,
            ////////////////////// Delete Room ////////////////////
            deleteRoom,
        }
    })
})

export default roomsSchema