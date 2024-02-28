import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date: string) => {
  return moment(date).fromNow();
};

export const getMysqlTimestamp = (): Date => {
  // const timestampString = moment().format("YYYY-MM-DD HH:MM:SS");
  // // Create a Date object from the timestamp string
  // const mysqlTimestamp = new Date(timestampString);
  // return mysqlTimestamp;

  const date = new Date();
  const timestamp = date.toISOString();
  return new Date(timestamp);
};
