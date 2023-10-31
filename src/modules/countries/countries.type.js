import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const createCountryType = new GraphQLObjectType({
    name: "createCountry",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        newCountry: {
            type: new GraphQLObjectType({
                name: "countryAdded",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString }
                }
            })
        }
    }
})
export const getAllCountriesType = new GraphQLObjectType({
    name: "getAllCountries",
    fields: {
        success: { type: GraphQLBoolean },
        countries: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "getCountries",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    countryImage: {
                        type: new GraphQLObjectType({
                            name: "countryAllImage",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        })
                    }
                }
            }))
        }
    }
})
export const getCountryByIdType = new GraphQLObjectType({
    name: "getCountryById",
    fields: {
        success: { type: GraphQLBoolean },
        country: {
            type: new GraphQLObjectType({
                name: "getCountry",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    countryImage: {
                        type: new GraphQLObjectType({
                            name: "countryImage",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        })
                    }
                }
            })
        }
    }
})
export const updatedCountryType = new GraphQLObjectType({
    name: "updateCountry",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        updatedCountry: {
            type: new GraphQLObjectType({
                name: "updatedCountry",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString }
                }
            })
        }
    }
})
export const deleteCountryType = new GraphQLObjectType({
    name: "deleteCountry",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})