import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useMutation } from "react-query";

const AddHotel = () => {
  const {showToast} = useAppContext();

  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {({ message: "Hotel Saved!", type: "SUCCESS"});
    },
    onError: ()=> {
      showToast({ message: "Error Saving Hotel", type: "ERROR"})
    }
  });

  const handleSave = (hotelFormData: FormData)=> {
    mutate(hotelFormData)
  }
  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default AddHotel