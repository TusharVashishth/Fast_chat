import { groupUrl, messageUrl } from "./api";

export async function fetchGroups(userId: string) {
  const res = await fetch(`${groupUrl}?user_id=${userId}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}

export async function fetchGroup(id: string) {
  const res = await fetch(`${groupUrl}/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}

export async function fetchMessages(id: string, page?: number) {
  const res = await fetch(`${messageUrl}/${id}?page=${page}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}
