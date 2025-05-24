import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// In prod merge telegram.ts and api.ts!!!!

export async function Renew(data: number) {
  const result = await axios.post(
    `${apiUrl}/api/renewsub`,
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

export async function Buy(duration: string) {
  const result = await axios.post(
    `${apiUrl}/api/buy`,
    {
      purchaseData: duration,
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
