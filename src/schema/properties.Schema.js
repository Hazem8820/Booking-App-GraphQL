import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../modules/properties/properties.merge.js";

const propertiesSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Read",
        description: "any field Read",
        fields: {
            ////////////////////// Get All Property ////////////////////
            getAllProperties,
            ////////////////////// Get Property By Id ////////////////////
            getPropertyById,
        }
    }),
    mutation: new GraphQLObjectType({
        name: "CUD",
        description: "any field Create,Update or Delete",
        fields: {
            ////////////////////// Create Property ////////////////////
            createProperty,
            ////////////////////// Update Property ////////////////////
            updateProperty,
            ////////////////////// Delete Property ////////////////////
            deleteProperty,
        }
    })
})

export default propertiesSchema