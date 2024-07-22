import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LocalStorageHandler = {
  getToken: () => {
    const data = localStorage.getItem("token");
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  },
  setToken: (data: any) => {
    localStorage.setItem("token", JSON.stringify(data));
  },
  removeToken: () => {
    localStorage.removeItem("token");
  },
};
