import express from "express"
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import myHotelRoutes from "./routes/my-hotels.js"
import hotelRoutes from "./routes/hotel.js"
import bookingRoutes from "./routes/my-bookings.js"
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary"
import path from "path"
import { fileURLToPath } from 'url';
mongoose
 .connect(process.env.MONGODB_CONNECTION_STRING)
//  .then(()=>
//     console.log("Conmected to databae: ", process.env.MONGODB_CONNECTION_STRING)
// )

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../frontend/dist")))
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/my-hotels", myHotelRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/my-bookings", bookingRoutes)

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(7400,()=>{
    console.log("server running on localhost:7400")
})

