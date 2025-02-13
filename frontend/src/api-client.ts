import { BookingFormData } from "./forms/BookingForm/BookingForm";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async() => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials:"include",
    });
    
    if(!response.ok){
        throw new Error("Error fetching user");
    }
    return response.json();
};



export const register = async (formData: RegisterFormData): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials:"include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        const errorMessage = responseBody.message || "An error occurred during registration.";
        throw new Error(errorMessage);
    }

    return responseBody; 
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message)
    }
    return body;
}

export const validateToken = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Token invalid");
    }

    return response.json();
}

export const signOut = async ()=> {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
    });

    if(!response.ok) {
        throw new Error("Error during sign out")
    }
}

export const addMyHotel = async (hotelFormData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
        method: "POST",
        body: hotelFormData, // FormData automatically sets the correct Content-Type
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Get the error message from the server
        console.error("Failed to add hotel: ", errorData);
        throw new Error(errorData.message || "Failed to add hotel");
      }
  
      return await response.json(); // Parse response JSON
    } catch (error) {
      console.error("Error adding hotel: ", error);
      throw error; // Propagate the error to the caller
    }
  };

  export const fetchMyHotels = async () => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials:"include"
    });

    if(!response.ok){
        throw new Error("Error fetching hotels");
    }

    return response.json();
  }
  
  export const fetchMyHotelById = async (hotelId: string) =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials:"include",
    })

    if(!response.ok){
        throw new Error("Error fetching Hotels")
    }

    return response.json();
  }

  export const updateMyHotelById = async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method:"PUT",
        body: hotelFormData,
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Faild to update Hotel")
    }

    return response.json();
  }

  export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
  }

  export const searchHotels = async(searchParams: SearchParams)=>{
    const queryParams = new URLSearchParams()
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("CheckIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "")
    queryParams.append("sortOption", searchParams.sortOption || "")

    searchParams.facilities?.forEach((facility)=>
    queryParams.append("facilities", facility)
    )

    searchParams.types?.forEach((type)=> queryParams.append("types", type))
    searchParams.stars?.forEach((star)=> queryParams.append("stars", star))

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
  }

  export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`);
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
    return response.json();
  };

  export const fetchHoteById = async (hotelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

    if(!response.ok){
        throw new Error("Error fetching Hotels")
    }

    return response.json();
  }

  export const createPaymentIntent = async(
    hotelId: string,
    numberOfNights: string,
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
            "Content-Type":"application/json",
        },
    })
    if(!response.ok){
        throw new Error("Error fetching payment intent");
    }
    return response.json();
  }

  export const createRoomBooking = async (formData: BookingFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    })
    if (!response.ok) {
        throw new Error("Error booking room");
      }
  }

  export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: "include",
    });
  
    console.log("res", response)
    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }
  
    return response.json();
  };
