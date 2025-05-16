import axios from "axios";

// In prod merge telegram.ts and api.ts!!!!

async function Buy(data: number) {
  const result = await axios.post(
    "https://my-mini-apps-vpn-back.loca.lt/api/renewsub",
    {
      renewDays: data,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await result;
}
export default Buy;
