// UserType
export const UserType = {
    _id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  
  // HotelType
 export const HotelType = {
    _id: '',
    userId: '',
    name: '',
    city: '',
    country: '',
    description: '',
    type: '',
    adultCount: 0,
    childCount: 0,
    facilities: [],
    pricePerNight: 0,
    starRating: 0,
    imageUrls: [],
    lastUpdated: new Date(),
    bookings: [] // List of BookingType objects
  };
  
  // BookingType
 export const BookingType = {
    _id: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    adultCount: 0,
    childCount: 0,
    checkIn: new Date(),
    checkOut: new Date(),
    totalCost: 0
  };
  
  // HotelSearchResponse
 export const HotelSearchResponse = {
    data: [], // Array of HotelType objects
    pagination: {
      total: 0,
      page: 0,
      pages: 0
    }
  };
  
  // PaymentIntentResponse
  export const PaymentIntentResponse = {
    paymentIntentId: '',
    clientSecret: '',
    totalCost: 0
  };
  
  