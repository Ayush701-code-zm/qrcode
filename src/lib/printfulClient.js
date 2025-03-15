import axios from "axios";

const PRINTFUL_API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API_KEY;

export const printful = axios.create({
  baseURL: "https://api.printful.com/",
  headers: {
    Authorization: `Bearer ${PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  },
});
