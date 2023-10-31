import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const createPropertyType = new GraphQLObjectType({
    name: "createProperty",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        newProperty: {
            type: new GraphQLObjectType({
                name: "propertyAdded",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    countryId: { type: GraphQLID }
                }
            })
        }
    }
})
export const getAllPropertiesType = new GraphQLObjectType({
    name: "getAllProperties",
    fields: {
        success: { type: GraphQLBoolean },
        properties: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "getProperties",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    propertyImage: {
                        type: new GraphQLObjectType({
                            name: "propertyAllImage",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        })
                    },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: "populateCountry",
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
            }))
        }
    }
})
export const getPropertyByIdType = new GraphQLObjectType({
    name: "getPropertyById",
    fields: {
        success: { type: GraphQLBoolean },
        property: {
            type: new GraphQLObjectType({
                name: "getProperty",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    propertyImage: {
                        type: new GraphQLObjectType({
                            name: "propertyImage",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        })
                    },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: "idCountry",
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
        }
    }
})
export const updatedPropertyType = new GraphQLObjectType({
    name: "updateProperty",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        updatedProperty: {
            type: new GraphQLObjectType({
                name: "updatedProperty",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: "updateCountry",
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
        }
    }
})
export const deletePropertyType = new GraphQLObjectType({
    name: "deleteProperty",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})