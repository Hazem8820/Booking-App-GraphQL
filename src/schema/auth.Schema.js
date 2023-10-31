import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { onlineUsers, resetPassCode, restPassEmail, signInObject, signUpObject } from "../modules/auth/auth.merge.js"


const authSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Read",
        description: "any field Read",
        fields: {
            ////////////////// Online Users //////////////////
            onlineUsers: onlineUsers
        }
    }),
    mutation: new GraphQLObjectType({
        name: "CUD",
        description: "any field Create,Update or Delete",
        fields: {
            ////////////////// Sign Up //////////////////
            Register: signUpObject,
            ////////////////// Sign In //////////////////
            Login: signInObject,
            ////////////////// Reset Password Email //////////////////
            reset_Password_Email: restPassEmail,
            ////////////////// Reset Password Code //////////////////
            reset_Password_Code: resetPassCode
        }
    })
})

export default authSchema