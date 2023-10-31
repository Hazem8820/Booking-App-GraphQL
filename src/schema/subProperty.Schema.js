import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createSubProperty, deleteSubProperty, getAllSubProperties, getSubPropertyById, updateSubProperty } from "../modules/subProperty/subProperty.merge.js";

const subPropertiesSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Read",
        description: "any field Read",
        fields: {
            ////////////////////// Get All subProperty ////////////////////
            getAllSubProperties,
            ////////////////////// Get subProperty By Id ////////////////////
            getSubPropertyById,
        }
    }),
    mutation: new GraphQLObjectType({
        name: "CUD",
        description: "any field Create,Update or Delete",
        fields: {
            ////////////////////// Create subProperty ////////////////////
            createSubProperty,
            ////////////////////// Update subProperty ////////////////////
            updateSubProperty,
            ////////////////////// Delete subProperty ////////////////////
            deleteSubProperty,
        }
    })
})

export default subPropertiesSchema