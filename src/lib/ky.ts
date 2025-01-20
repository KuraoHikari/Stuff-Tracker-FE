import ky from "ky";

// const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const baseUrl = "http://localhost:3000/api";

const kyInstance = ky.create({
 prefixUrl: baseUrl,
 parseJson: (text) =>
  JSON.parse(text, (key, value) => {
   if (key.endsWith("At")) return new Date(value);

   return value;
  }),
});

export interface HTTPError extends Error {
 response: {
  json: () => Promise<{ message: string }>;
 };
}

export function isHTTPError(error: unknown): error is HTTPError {
 return (error as HTTPError).response?.json !== undefined;
}

export default kyInstance;
