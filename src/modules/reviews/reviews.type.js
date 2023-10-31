import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const createReviewType = new GraphQLObjectType({
    name: "createReview",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        review: {
            type: new GraphQLObjectType({
                name: "created",
                fields: {
                    _id: { type: GraphQLString },
                    user: { type: GraphQLID },
                    content: { type: GraphQLString }
                }
            })
        }
    }
})
export const updateReviewType = new GraphQLObjectType({
    name: "updateReview",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const deleteReviewType = new GraphQLObjectType({
    name: "deleteReview",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const getAllReviewsType = new GraphQLObjectType({
    name: "getAllReviews",
    fields: {
        success: { type: GraphQLBoolean },
        reviews: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "reviewObj",
                fields: {
                    _id: { type: GraphQLID },
                    user: {
                        type: new GraphQLObjectType({
                            name: "user",
                            fields: {
                                _id: { type: GraphQLID },
                                userName: { type: GraphQLString },
                                email: { type: GraphQLString }
                            }
                        })
                    },
                    content: { type: GraphQLString }
                }
            }))
        }
    }
})
export const getReviewsByIdType = new GraphQLObjectType({
    name: "getReviewsByIdType",
    fields: {
        success: { type: GraphQLBoolean },
        review: {
            type: new GraphQLObjectType({
                name: "reviewObjId",
                fields: {
                    _id: { type: GraphQLID },
                    user: {
                        type: new GraphQLObjectType({
                            name: "userId",
                            fields: {
                                _id: { type: GraphQLID },
                                userName: { type: GraphQLString },
                                email: { type: GraphQLString }
                            }
                        })
                    },
                    content: { type: GraphQLString }
                }
            })
        }
    }
})