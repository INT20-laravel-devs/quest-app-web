import { User } from "@/types/auth";
import { API_URL } from "./constant";

export const userUpdate = async (data: User) => {
  try {
    const response = await fetch(`${API_URL}/users/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};
