import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const signUpType = new GraphQLObjectType({
    name: "Sign_Up",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const signInType = new GraphQLObjectType({
    name: "Sign_In",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        token: { type: GraphQLString }
    }
})
export const passEmailType = new GraphQLObjectType({
    name: 'Reset_Password_Email',
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const PassCodeType = new GraphQLObjectType({
    name: 'Reset_Password_Code',
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        tempPass: { type: GraphQLString },
    }
})
export const onlineType = new GraphQLObjectType({
    name: "Online_Users",
    fields: {
        success: { type: GraphQLBoolean },
        onlineUsers: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'Online_Object',
                fields: {
                    _id: { type: GraphQLID },
                    userName: { type: GraphQLString },
                    email: { type: GraphQLString }
                }
            }))
        },
    }
})