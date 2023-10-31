import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const createReservationType = new GraphQLObjectType({
    name: "createReservationType",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        newReservation: {
            type: new GraphQLObjectType({
                name: "newReservation",
                fields: {
                    user: { type: GraphQLID },
                    nationality: { type: GraphQLString },
                    nightCount: { type: GraphQLInt },
                    arrival_Date: { type: GraphQLString },
                    departure_Date: { type: GraphQLString },
                    countryId: { type: GraphQLID },
                    propertyId: { type: GraphQLID },
                    subPropertyId: { type: GraphQLID },
                    roomId: { type: GraphQLID },
                    adults: { type: GraphQLInt },
                    kids: { type: GraphQLInt },
                    totalPrice: { type: GraphQLInt },
                    status: { type: GraphQLString },
                    payment: { type: GraphQLString }
                }
            })
        }
    }
})
export const getAllReservationType = new GraphQLObjectType({
    name: "getAllReservationType",
    fields: {
        success: { type: GraphQLBoolean },
        reservations: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "reservations",
                fields: {
                    user: {
                        type: new GraphQLObjectType({
                            name: 'user',
                            fields: {
                                id: { type: GraphQLID },
                                firstName: { type: GraphQLString },
                                lastName: { type: GraphQLString },
                                userName: { type: GraphQLString },
                                email: { type: GraphQLString },
                                phone: { type: GraphQLString },
                            }
                        })
                    },
                    nationality: { type: GraphQLString },
                    nightCount: { type: GraphQLInt },
                    arrival_Date: { type: GraphQLString },
                    departure_Date: { type: GraphQLString },
                    countryId: {
                        type: new GraphQLObjectType({
                            name: 'countryId',
                            fields: {
                                name: { type: GraphQLString },
                                slug: { type: GraphQLString }
                            }
                        })
                    },
                    propertyId: {
                        type: new GraphQLObjectType({
                            name: 'propertyId',
                            fields: {
                                name: { type: GraphQLString },
                                slug: { type: GraphQLString }
                            }
                        })
                    },
                    subPropertyId: {
                        type: new GraphQLObjectType({
                            name: 'subPropertyId',
                            fields: {
                                name: { type: GraphQLString },
                                slug: { type: GraphQLString }
                            }
                        })
                    },
                    roomId: {
                        type: new GraphQLObjectType({
                            name: 'roomId',
                            fields: {
                                name: { type: GraphQLString },
                                pricePerNight: { type: GraphQLInt },
                                roomCapacity: { type: GraphQLInt },
                                bedCount: { type: GraphQLString },
                                description: { type: GraphQLString }
                            }
                        })
                    },
                    adults: { type: GraphQLInt },
                    kids: { type: GraphQLInt },
                    totalPrice: { type: GraphQLInt },
                    status: { type: GraphQLString },
                    payment: { type: GraphQLString }
                }
            }))
        }
    }
})
export const deleteReservationType = new GraphQLObjectType({
    name: "deleteReservationType",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const cancelReservationType = new GraphQLObjectType({
    name: "cancelReservationType",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})