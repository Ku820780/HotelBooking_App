import express from "express";
import verifyToken from "../middleware/auth.js";
import { Hotel } from "../models/hotel.js";
const router = express.Router();


//api/my-bookings
router.get("/", verifyToken, async (req, res) => {
    try {
      const hotels = await Hotel.find({
        bookings: { $elemMatch: { userId: req.userId } },
      });
  
      const results = hotels.map((hotel) => {
        const userBookings = hotel.bookings.filter(
          (booking) => booking.userId === req.userId
        );
  
        const hotelWithUserBookings = {
          ...hotel.toObject(),
          bookings: userBookings,
        };
  
        return hotelWithUserBookings;
      });
  
      res.status(200).send(results);
      console.log(results)
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unable to fetch bookings" });
    }
  });

export default router;
