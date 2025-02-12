import { API_URL } from '@/api/constant';

export const updateAvatar = async (formData: FormData) => {
  try {
    const res = await fetch(`${API_URL}/users/avatars/upload`, {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
    });

    if (!res.ok) {
      const response = await res.json();
      throw new Error(await response.json());
    }

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const updateProfile = async (userId: string, nickname: string) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ nickname }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const response = await res.json();
      throw new Error(await response.json());
    }

    return res;
  } catch (e) {
    console.error(e);
  }
};
