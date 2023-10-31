import verifyToken from './../utils/verifyTokenFunction.js';
import userModel from './../../DB/models/user.model.js';
import tokenModel from './../../DB/models/token.model.js';

const isAuthenticated = async (args) => {
    const { token } = args
    if (!token?.startsWith(process.env.TOKEN_BEARER)) throw new Error("token is required") // check Bearer Token
    const splitedToken = token.split(process.env.TOKEN_BEARER)[1]
    if (!splitedToken) throw new Error("In-Valid Token") // check token
    const decode = verifyToken(splitedToken, process.env.TOKEN_SIGNATURE)
    if (!decode.id) throw new Error("In-Valid Payload") // check token payload
    const checkToken = await tokenModel.findOne({ user: decode.id, isValid: true })
    if (!checkToken) throw new Error("Token Expired") // check token's expire date
    const user = await userModel.findById(decode.id)
    if (!user) throw new Error("User is Not Registered") // check user
    return user 
}

export default isAuthenticated