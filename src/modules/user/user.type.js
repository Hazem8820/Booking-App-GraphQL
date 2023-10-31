import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const getAllType = new GraphQLObjectType({
    name: "getAll",
    fields: {
        success: { type: GraphQLBoolean },
        users: {
            type: new GraphQLList(new GraphQLObjectType({
                name: "allUsers",
                fields: {
                    _id: { type: GraphQLID },
                    firstName: { type: GraphQLString },
                    lastName: { type: GraphQLString },
                    userName: { type: GraphQLString },
                    email: { type: GraphQLString },
                    age: { type: GraphQLString },
                    gender: { type: GraphQLString },
                    status: { type: GraphQLString },
                    role: { type: GraphQLString },
                }
            }))
        }
    }
})
export const getByIdType = new GraphQLObjectType({
    name: 'getById',
    fields: {
        success: { type: GraphQLBoolean },
        user: {
            type: new GraphQLObjectType({
                name: "one_user",
                fields: {
                    _id: { type: GraphQLID },
                    firstName: { type: GraphQLString },
                    lastName: { type: GraphQLString },
                    userName: { type: GraphQLString },
                    email: { type: GraphQLString },
                    age: { type: GraphQLString },
                    gender: { type: GraphQLString },
                    status: { type: GraphQLString },
                    role: { type: GraphQLString },
                }
            })
        }
    }
})
export const updateUserType = new GraphQLObjectType({
    name: "updateUser",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        newUser: {
            type: new GraphQLObjectType({
                name: 'Updated',
                fields: {
                    firstName: { type: GraphQLString },
                    lastName: { type: GraphQLString },
                    userName: { type: GraphQLString },
                    email: { type: GraphQLString },
                    phone: { type: GraphQLString },
                    age: { type: GraphQLInt },
                }
            })
        }
    }
})
export const deleteUserType = new GraphQLObjectType({
    name: "deleteUser",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const changePassType = new GraphQLObjectType({
    name: "changePassType",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})
export const logoutType = new GraphQLObjectType({
    name: "logoutType",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    }
})