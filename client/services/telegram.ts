import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function ValidateData(data: string) {
  const response = await axios.post(
    `${apiUrl}/api/validate`,
    {
      rawdata: data,
    },
    {
      headers: {
        "bypass-tunnel-reminder": true, // remove in production
      },
      withCredentials: true,
    }
  );
  return await response.data;
}
export default ValidateData;
