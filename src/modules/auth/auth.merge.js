import { resetPassCodeValidationSchema, resetPassEmailValidationSchema, signinValidationSchema, signupValidationSchema } from './auth.validation.js'
import userModel from '../../../DB/models/user.model.js'
import tokenModel from './../../../DB/models/token.model.js';
import { validation } from '../../middleware/validation.js'
import generateToken from '../../utils/signTokenFunction.js'
import { confirmStamp, resetPassStamp } from '../../utils/generateHTML.js'
import { GraphQLInt, GraphQLString } from 'graphql'
import sendEmail from '../../utils/sendemail.js'
import { PassCodeType, onlineType, passEmailType, signInType, signUpType } from './auth.type.js'
import randomstring from "randomstring";
import bcrypt from 'bcryptjs';


export const signUpObject = {
    type: signUpType,
    args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        confirmPassword: { type: GraphQLString },
        phone: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        await validation(signupValidationSchema, args) // validation
        const { firstname, lastname, username, email, password, phone, age, gender } = args // data
        const user = await userModel.findOne({ email })
        if (user) throw new Error("Account Already Exist Try To Change email") // check user
        const hasedPass = bcrypt.hashSync(password, Number(process.env.SALT_ROUND)) // hashpass
        const newUser = await userModel.create({ firstName: firstname, lastName: lastname, userName: username, email, password: hasedPass, phone, age, gender })
        const token = generateToken({ id: newUser._id }, process.env.EMAIL_SIGNATURE, 60 * 5) // confirm code
        const newToken = generateToken({ id: newUser._id }, process.env.EMAIL_SIGNATURE, 60 * 60 * 24 * 30) // verify confirm code
        const html = confirmStamp(`http://localhost:5000/auth/confirmemail/${token}`, `http://localhost:5000/auth/newconfirmemail/${newToken}`) // htmlTemp
        await sendEmail({ to: newUser.email, subject: "Email Confirmation", html }) // send mail
        return { success: true, message: "Go Check Your Email inBox Please" } // response
    }
}
export const signInObject = {
    type: signInType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (_, args, req) => {
        await validation(signinValidationSchema, args) // validation
        const user = await userModel.findOne({ email: args.email })
        if (!user) throw new Error("Account Not Exist Please Try To Sign Up First") // check user
        const match = bcrypt.compareSync(args.password, user.password)
        if (!match) throw new Error("In_Correct Email or Password") // check password
        if (!user.isConfirmed) new Error("This Account is Not Active Yet Please Go Activate Your Account First") // check acitvation
        const token = generateToken({ id: user._id }, process.env.TOKEN_SIGNATURE, "1d")
        await tokenModel.create({ token, user: user._id, expireAt: "1d" }) // create Token
        user.status = 'online'
        await user.save() // update user's status
        return { success: true, message: `Welcome Back Sir ${user.firstName} ${user.lastName}`, token } // response
    }
}
export const restPassEmail = {
    type: passEmailType,
    args: {
        email: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        await validation(resetPassEmailValidationSchema, args)
        const user = await userModel.findOne({ email: args.email })
        if (!user) throw new Error('Account Not Exist Please Try To Sign Up First') // check user
        const code = randomstring.generate({ length: 5, charset: 'numeric' }) // genrate code
        user.forgotCode = code
        await user.save() // store code
        const html = resetPassStamp(code) // html temp
        await sendEmail({ to: user.email, subject: "Reset Password Code", html }) // send mail
        return { success: true, message: "Please Check Your Mail inBox" } // response
    }
}
export const resetPassCode = {
    type: PassCodeType,
    args: {
        code: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        await validation(resetPassCodeValidationSchema, args) // validation
        const checkUser = await userModel.findOneAndUpdate({ forgotCode: args.code }, { status: "offline", $unset: { forgotCode: 1 } })
        if (!checkUser) throw new Error('In_Valid Code') // check user
        const tempPass = randomstring.generate({ length: 2, charset: 'string' }).toUpperCase() + ["!", "@", "#", "$", "%", "^", "&", "*"][Math.floor(Math.random() * 7)] + randomstring.generate({ length: 6, charset: 'numeric' }) //temp pass
        const hasedPass = bcrypt.hashSync(tempPass, Number(process.env.SALT_ROUND)) // hash pass
        checkUser.password = hasedPass
        await checkUser.save() // update pass
        const tokens = await tokenModel.find({ user: checkUser._id }) 
        tokens.forEach(async token => {
            token.isValid = false
            await token.save() // update user's tokens
        })
        return { success: true, message: `You can Login With Your Temporary Password Sir ${checkUser.firstName} ${checkUser.lastName}`, tempPass } // response
    }
}
export const onlineUsers = {
    type: onlineType,
    resolve: async () => {
        const onlineUsers = await userModel.find({ status: 'online' })
        if (!onlineUsers) throw new Error('There is Noone Online At The Moment Please Try Again Later') // check online users
        return { success: true, onlineUsers }
    }
}