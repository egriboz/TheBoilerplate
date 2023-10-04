import { Image } from "@/utils/types";
import { notFound } from "next/navigation";

const SERVER_IP = process.env.SERVER_IP || "http://0.0.0.0:8000"; 
const DOCKER_API_URL = "http://backend:8000";
const API_URL = process.env.API_URL || SERVER_IP;

export const replaceBackendUrl = (url: string): string => {
  return url.replace(DOCKER_API_URL, SERVER_IP);
};

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return notFound();
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const replaceImageUrls = (item: any) => {
  if (item.image) {
    item.image = replaceBackendUrl(item.image);
  }

  if (item.images) {
    item.images = item.images.map((img: Image) => {
      img.image = replaceBackendUrl(img.image);
      return img;
    });
  }

  return item;
};
