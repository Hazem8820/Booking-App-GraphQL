import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from './../modules/reviews/reviews.merge.js';

const reviewsSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Read",
        description: "any field Read",
        fields: {
            ////////////////////// Get All Reviews ////////////////////
            getAllReviews,
            ////////////////////// Get Reviews By Id ////////////////////
            getReviewById,
        }
    }),
    mutation: new GraphQLObjectType({
        name: "CUD",
        description: "any field Create,Update or Delete",
        fields: {
            ////////////////////// Create Reviews ////////////////////
            createReview,
            ////////////////////// Update Reviews ////////////////////
            updateReview,
            ////////////////////// Delete Reviews ////////////////////
            deleteReview,
        }
    })
})

export default reviewsSchema