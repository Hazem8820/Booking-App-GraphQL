import { GraphQLID, GraphQLString } from "graphql";
import isAuthenticated from './../../middleware/authentication.js';
import { validation } from "../../middleware/validation.js";
import { createReviewValidationSchema, deleteReviewValidationSchema, getReviewByIdValidationSchema, updateReviewValidationSchema } from "./reviews.validation.js";
import reviewModel from "../../../DB/models/reviews.model.js";
import roomsModel from "../../../DB/models/rooms.model.js";
import { createReviewType, deleteReviewType, getAllReviewsType, getReviewsByIdType, updateReviewType } from "./reviews.type.js";

export const createReview = {
    type: createReviewType,
    args: {
        token: { type: GraphQLString },
        roomId: { type: GraphQLID },
        content: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await validation(createReviewValidationSchema, args) // validation
        const room = await roomsModel.findById(args.roomId) 
        if (!room) throw new Error("There is No Room With This Id") // check room id
        const review = await reviewModel.create({ user: user._id, content: args.content }) // create review
        await roomsModel.findByIdAndUpdate(room._id, { $push: { reviews: { id: review._id } } }) // push review to room's model
        return { success: true, message: "Your Feedback Submitted Successfully", review } //response
    }
}
export const updateReview = {
    type: updateReviewType,
    args: {
        token: { type: GraphQLString },
        id: { type: GraphQLID },
        content: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication 
        await validation(updateReviewValidationSchema, args) // validation
        const review = await reviewModel.findById(args.id) 
        if (!review) throw new Error("There is No Review With This Id") // check review id
        if (toString(user._id) !== toString(review.user)) throw new Error("You Are Not Authorized To Update This Review") // check createdBy
        await reviewModel.findByIdAndUpdate(args.id, { content: args.content }) // update review
        return { success: true, message: "Review Updated Successfully" }
    }
}
export const deleteReview = {
    type: deleteReviewType,
    args: {
        token: { type: GraphQLString },
        roomId: { type: GraphQLID },
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await validation(deleteReviewValidationSchema, args) // validation
        const review = await reviewModel.findById(args.id) 
        if (!review) throw new Error("There is No Review With This Id") // check review id
        if (toString(user._id) !== toString(review.user)) throw new Error("You Are Not Authorized To Delete This Review") // check createdBy
        await roomsModel.findByIdAndUpdate(args.roomId, { $pull: { reviews: { id: review._id } } }) // pull deleted review from room's model
        await reviewModel.findByIdAndDelete(args.id) // delete review
        return { success: true, message: "Review Delete Successfully" } // response
    }
}
export const getAllReviews = {
    type: getAllReviewsType,
    resolve: async () => {
        const reviews = await reviewModel.find({}).populate("user")
        return { success: true, reviews } 
    }
}
export const getReviewById = {
    type: getReviewsByIdType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        await validation(getReviewByIdValidationSchema, args)
        const review = await reviewModel.findOne({}).populate("user")
        if (!review) throw new Error("There is No Review With This Id") // check review's id
        return { success: true, review }
    }
}