import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const createRoomType = new GraphQLObjectType({
    name: "createRoom",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        newRoom: {
            type: new GraphQLObjectType({
                name: "created",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    description: { type: GraphQLString },
                    images: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: "roomsImages",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        }))
                    },
                    roomCapacity: { type: GraphQLInt },
                    bedCount: { type: GraphQLString },
                    adults: { type: GraphQLInt },
                    children: { type: GraphQLInt },
                    pricePerNight: { type: GraphQLInt },
                    createdBy: { type: GraphQLID },
                    countryId: { type: GraphQLID },
                    propertyId: { type: GraphQLID },
                    subPropertyId: { type: GraphQLID },
                    rate: { type: GraphQLString }
                }
            })
        }
    }
})
export const updateRoomType = new GraphQLObjectType({
    name: "updateRoom",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        newRoom: {
            type: new GraphQLObjectType({
                name: "updated",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    description: { type: GraphQLString },
                    images: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: "updateRoomsImages",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        }))
                    },
                    roomCapacity: { type: GraphQLInt },
                    bedCount: { type: GraphQLString },
                    adults: { type: GraphQLInt },
                    children: { type: GraphQLInt },
                    pricePerNight: { type: GraphQLInt },
                    createdBy: { type: GraphQLID },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: "updateCountryRelation",
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
                            name: "updatePropertyRelation",
                            fields: {
                                _id: { type: GraphQLID },
                                name: { type: GraphQLString },
                                slug: { type: GraphQLString },
                                createdBy: { type: GraphQLID },
                                customId: { type: GraphQLString }
                            }
                        })
                    },
                    subPropertyId: {
                        type: new GraphQLObjectType({
                            name: "updateSubPropertyRelation",
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
                                        name: "updateSubPropertyAllImage",
                                        fields: {
                                            url: { type: GraphQLString },
                                            id: { type: GraphQLString }
                                        }
                                    })
                                },
                            }
                        })
                    },
                    rate: { type: GraphQLString },
                }
            })
        }
    }
})
export const getAllRoomsType = new GraphQLObjectType({
    name: "getAllRoomsType",
    fields: {
        success: { type: GraphQLBoolean },
        rooms: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "getAll",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    description: { type: GraphQLString },
                    images: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: "roomImages",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        }))
                    },
                    roomCapacity: { type: GraphQLInt },
                    bedCount: { type: GraphQLString },
                    adults: { type: GraphQLInt },
                    children: { type: GraphQLInt },
                    pricePerNight: { type: GraphQLInt },
                    createdBy: { type: GraphQLID },
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
                    },
                    subPropertyId: {
                        type: new GraphQLObjectType({
                            name: "subPropertyRelation",
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
                            }
                        })
                    },
                    rate: { type: GraphQLString },
                }
            }))
        }
    }
})
export const getRoomByIdType = new GraphQLObjectType({
    name: "getRoomByIdType",
    fields: {
        success: { type: GraphQLBoolean },
        room: {
            type: new GraphQLObjectType({
                name: "getById",
                fields: {
                    _id: { type: GraphQLID },
                    name: { type: GraphQLString },
                    description: { type: GraphQLString },
                    images: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: "roomImagesId",
                            fields: {
                                url: { type: GraphQLString },
                                id: { type: GraphQLString }
                            }
                        }))
                    },
                    roomCapacity: { type: GraphQLInt },
                    bedCount: { type: GraphQLString },
                    adults: { type: GraphQLInt },
                    children: { type: GraphQLInt },
                    pricePerNight: { type: GraphQLInt },
                    createdBy: { type: GraphQLID },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: "countryRelationId",
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
                            name: "propertyRelationId",
                            fields: {
                                _id: { type: GraphQLID },
                                name: { type: GraphQLString },
                                slug: { type: GraphQLString },
                                createdBy: { type: GraphQLID },
                                customId: { type: GraphQLString }
                            }
                        })
                    },
                    subPropertyId: {
                        type: new GraphQLObjectType({
                            name: "subPropertyRelationId",
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
                                        name: "subPropertyAllImageId",
                                        fields: {
                                            url: { type: GraphQLString },
                                            id: { type: GraphQLString }
                                        }
                                    })
                                },
                            }
                        })
                    },
                    rate: { type: GraphQLString },
                }
            })
        }
    }
})
export const deleteRoomType = new GraphQLObjectType({
    name: "deleteRoomType",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})