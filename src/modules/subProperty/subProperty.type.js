import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const createSubPropertyType = new GraphQLObjectType({
    name: "createSubProperty",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        newSubProperty: {
            type: new GraphQLObjectType({
                name: "created",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    roomsCount: { type: GraphQLInt },
                    availableRooms: { type: GraphQLInt },
                    reservedRooms: { type: GraphQLInt },
                    subPropertyImage: {
                        type: new GraphQLObjectType({
                            name: "subPropertyImage",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        })
                    },
                    countryId: { type: GraphQLString },
                    propertyId: { type: GraphQLString },
                }
            })
        }
    }
})
export const updateSubPropertyType = new GraphQLObjectType({
    name: "updateSubProperty",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        updatedSubProperty: {
            type: new GraphQLObjectType({
                name: "updated",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    roomsCount: { type: GraphQLInt },
                    availableRooms: { type: GraphQLInt },
                    reservedRooms: { type: GraphQLInt },
                    subPropertyImage: {
                        type: new GraphQLObjectType({
                            name: "updatedSubPropertyImage",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        })
                    },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: "updatedCountryRelation",
                            fields: {
                                _id: { type: GraphQLID },
                                name: { type: GraphQLString },
                                slug: { type: GraphQLString },
                                createdBy: { type: GraphQLID },
                                customId: { type: GraphQLString }
                            }
                        })
                    },
                    propertyId: {
                        type: new GraphQLObjectType({
                            name: "updatedPropertyRelation",
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
export const deleteSubPropertyType = new GraphQLObjectType({
    name: "deleteSubProperty",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const getAllSubPropertiesType = new GraphQLObjectType({
    name: "getAllSubProperties",
    fields: {
        success: { type: GraphQLBoolean },
        subProperties: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "getAll",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    roomsCount: { type: GraphQLInt },
                    availableRooms: { type: GraphQLInt },
                    reservedRooms: { type: GraphQLInt },
                    subPropertyImage: {
                        type: new GraphQLObjectType({
                            name: "subPropertyAllImage",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        })
                    },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: "countryRelation",
                            fields: {
                                _id: { type: GraphQLID },
                                name: { type: GraphQLString },
                                slug: { type: GraphQLString },
                                createdBy: { type: GraphQLID },
                                customId: { type: GraphQLString }
                            }
                        })
                    },
                    propertyId: {
                        type: new GraphQLObjectType({
                            name: "propertyRelation",
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
export const getSubPropertyByIdType = new GraphQLObjectType({
    name: "getSubPropertyById",
    fields: {
        success: { type: GraphQLBoolean },
        subProperty: {
            type: new GraphQLObjectType({
                name: "getSubProperty",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    slug: { type: GraphQLString },
                    createdBy: { type: GraphQLID },
                    customId: { type: GraphQLString },
                    roomsCount: { type: GraphQLInt },
                    availableRooms: { type: GraphQLInt },
                    reservedRooms: { type: GraphQLInt },
                    propertyImage: {
                        type: new GraphQLObjectType({
                            name: "IdsubPropertyImage",
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
                    },
                    propertyId: {
                        type: new GraphQLObjectType({
                            name: "idProperty",
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