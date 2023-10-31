import { GraphQLID, GraphQLInt, GraphQLString } from "graphql"
import userModel from "../../../DB/models/user.model.js"
import { validation } from "../../middleware/validation.js"
import { changePassType, deleteUserType, getAllType, getByIdType, logoutType, updateUserType } from "./user.type.js"
import { changePassValidationSchema, deleteUserValidationSchema, getByIdValidationSchema, updateUserValidationSchema } from "./user.validation.js"
import isAuthenticated from './../../middleware/authentication.js';
import isAuthorized from './../../middleware/authorization.js';
import bcrypt from 'bcryptjs';
import tokenModel from "../../../DB/models/token.model.js"

export const getAll = {
    type: getAllType,
    resolve: async () => {
        const users = await userModel.find({})
        if (!users) throw new Error("No Users Available")
        return { success: true, users }
    }
}
export const getById = {
    type: getByIdType,
    args: {
        id: { type: GraphQLID },
    },
    resolve: async (_, args) => {
        await validation(getByIdValidationSchema, args)
        const user = await userModel.findById(args.id)
        if (!user) throw new Error('In_Valid Id')
        return { success: true, user }
    }
}
export const updateUser = {
    type: updateUserType,
    args: {
        token: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        age: { type: GraphQLInt },
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args) // authentication
        await validation(updateUserValidationSchema, args) // validation
        const { firstName, lastName, userName, email, phone, age } = args // date
        const newUser = await userModel.findByIdAndUpdate(user._id, { firstName, lastName, userName, email, phone, age }, { new: true })
        return { success: true, message: "Account Has Been Updated Successfully", newUser }
    }
}
export const deleteUser = {
    type: deleteUserType,
    args: {
        token: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args)
        await isAuthorized('admin', user.role)
        await validation(deleteUserValidationSchema, args)
        await userModel.findByIdAndDelete(user._id)
        return { success: true, message: 'User Removed Successfully' }
    }
}
export const softDelete = {
    type: deleteUserType,
    args: {
        token: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args)
        await isAuthorized('admin', user.role)
        await validation(deleteUserValidationSchema, args)
        await userModel.findByIdAndUpdate(user._id, { isDeleted: true })
        return { success: true, message: 'User Removed Successfully' }
    }
}
export const changePass = {
    type: changePassType,
    args: {
        token: { type: GraphQLString },
        currentPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString },
        confirmNewPassword: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args)
        await validation(changePassValidationSchema, args)
        const match = bcrypt.compareSync(args.currentPassword, user.password)
        if (!match) throw new Error("In_Correct Current Password")
        const hashedPass = bcrypt.hashSync(args.newPassword, Number(process.env.SALT_ROUND))
        await userModel.findByIdAndUpdate(user._id, { password: hashedPass })
        return { success: true, message: 'Password Changed Successfully' }
    }
}
export const logout = {
    type: logoutType,
    args: {
        token: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const user = await isAuthenticated(args)
        await userModel.findByIdAndUpdate(user._id, { status: "offline" })
        const tokens = await tokenModel.find({ user: user._id })
        tokens.forEach(async token => {
            token.isValid = false
            await token.save()
        })
        return { success: true, message: "you have logged out Successfully !" }
    }
}