import { type ClassValue, clsx } from "clsx";
import { addRequestMeta } from "next/dist/server/request-meta";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
