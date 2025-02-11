
interface IPAPIResponse {
  city: string;
  region: string;
  country_name: string;
}

export const getLocationFromIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data: IPAPIResponse = await response.json();
    return `${data.city}, ${data.region}, ${data.country_name}`;
  } catch (error) {
    console.error("Error fetching location:", error);
    return "";
  }
};
