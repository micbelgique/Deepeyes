import axios from 'axios';

const azFunctionUrl = import.meta.env.VITE_FUNCTION_APP_URL +"/SaveGeneratedImage"

 const saveGeneratedImage = async (imageUrl : string) => {
    try {
      const response = await axios.post(azFunctionUrl, { imageUrl });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

export { saveGeneratedImage }
