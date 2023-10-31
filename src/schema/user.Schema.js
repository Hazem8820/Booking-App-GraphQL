import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { changePass, deleteUser, getAll, getById, logout, softDelete, updateUser } from "../modules/user/user.merge.js";

const userShcema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Read',
        description: "any field Read",
        fields: {
            //////////////////////// GET ALL USERS ////////////////////////
            getAll,
            //////////////////////// GET USER By Id ////////////////////////
            getById,
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'CUD',
        description: "any field Create,Update or Delete",
        fields: {
            //////////////////////// Update User ////////////////////////
            updateUser,
            //////////////////////// Delete User ////////////////////////
            deleteUser,
            //////////////////////// Delete User ////////////////////////
            softDelete,
            //////////////////////// Delete User ////////////////////////
            changePass,
            //////////////////////// Delete User ////////////////////////
            logout
        }
    })
})
export default userShcema