import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe} from "@stripe/stripe-js";


const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""
// Define the ToastMessage type
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// Define the AppContext type
type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

// Create a context with the defined type
const AppContext = React.createContext<AppContextType | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

// AppContextProvider component to provide the context
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // Define the showToast function
  const showToast = (toastMessage: ToastMessage) => {
    setToast(toastMessage); // Update toast message
  };

  // Using `useQuery` to validate the token
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast,
        isLoggedIn: !isError, // If there is an error, user is not logged in
        stripePromise,
      }}
    >
      {/* Show toast if toast state is not undefined */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
