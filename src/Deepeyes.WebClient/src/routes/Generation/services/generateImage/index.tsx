import axios from 'axios';

const azFunctionUrl = import.meta.env.VITE_FUNCTION_APP_URL +"/GenerateImage"

 const generateImage = async (prompt : string) => {
    try {
      const response = await axios.post(azFunctionUrl, { prompt });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

export { generateImage }
