import mongoose from "mongoose";

// Booking schema
const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Use ObjectId for user reference
  totalCost: { type: Number, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Hotel schema
const hotelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Use ObjectId for user reference
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, default: Date.now }, // Default to current date
  bookings: [bookingSchema], // Embedded bookings
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

export const Hotel = mongoose.model("Hotel", hotelSchema);
