import { globalErrorHandler } from "./utils/globalErrorHandling.js"
import authRouter from "./modules/auth/rest.apis/auth.confirmationRouter.js"
import userRouter from "./modules/user/rest.apis/user.router.js"
import { createHandler } from "graphql-http/lib/use/http"
import countriesSchema from "./schema/countries.Schema.js"
import propertiesSchema from "./schema/properties.Schema.js"
import subPropertiesSchema from "./schema/subProperty.Schema.js"
import reservationSchema from "./schema/reservation.Schema.js"
import roomsSchema from "./schema/rooms.Schema.js"
import reviewsSchema from "./schema/reviews.Schema.js"
import authSchema from "./schema/auth.Schema.js"
import userShcema from "./schema/user.Schema.js"
import connectDB from "../DB/connection.js"
import cors from "cors"


const appRouter = (express, app) => {
    //////////////////////////////// DB ///////////////////////////////////////
    connectDB()
    //////////////////////////// Allow Any Origin /////////////////////////////
    app.use(cors())
    //////////////////////////// GraphQL Schema ///////////////////////////////
    app.use('/auth', createHandler({ schema: authSchema }))
    app.use('/user', createHandler({ schema: userShcema }))
    app.use('/country', createHandler({ schema: countriesSchema }))
    app.use('/property', createHandler({ schema: propertiesSchema }))
    app.use('/subProperty', createHandler({ schema: subPropertiesSchema }))
    app.use('/room', createHandler({ schema: roomsSchema }))
    app.use('/review', createHandler({ schema: reviewsSchema }))
    app.use('/reservation', createHandler({ schema: reservationSchema }))
    //////////////////////////// Rest API /////////////////////////////////////
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    //////////////////////////// Wrong End Point //////////////////////////////
    app.all("*", (req, res, next) => { next(new Error("End Point Not Found", { cause: 404 })) })
    //////////////////////////// Global Error Handler /////////////////////////
    app.use(globalErrorHandler)
}
export default appRouter