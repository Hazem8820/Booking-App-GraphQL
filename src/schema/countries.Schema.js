import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createCountry, deleteCountry, getAllCountries, getCountryById, updateCountry } from "../modules/countries/countries.merge.js";

const countriesSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Read",
        description: "any field Read",
        fields: {
            ////////////////////// Get All Country ////////////////////
            getAllCountries,
            ////////////////////// Get Country By Id ////////////////////
            getCountryById,
        }
    }),
    mutation: new GraphQLObjectType({
        name: "CUD",
        description: "any field Create,Update or Delete",
        fields: {
            ////////////////////// Create Country ////////////////////
            createCountry,
            ////////////////////// Update Country ////////////////////
            updateCountry,
            ////////////////////// Delete Country ////////////////////
            deleteCountry,
        }
    })
})

export default countriesSchema