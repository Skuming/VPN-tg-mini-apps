import axios from "axios";

async function ValidateData(data: string) {
  const response = await axios.post(
    "https://my-mini-apps-vpn-back.loca.lt/api/validate",
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
