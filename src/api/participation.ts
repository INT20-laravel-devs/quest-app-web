import { Participation } from '@/types/participation';
import { API_URL } from '@/api/constant';

export const createParticipation = async (data: Participation) => {
  try {
    const response = await fetch(`${API_URL}/participation`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as Participation;
  } catch (e) {
    throw e;
  }
};

export const getParticipations = async () => {
  try {
    const res = await fetch(`${API_URL}/participation`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return (await res.json()) as Participation[];
  } catch (e) {
    throw e;
  }
};

export const getParticipation = async (questId: string) => {
  try {
    const res = await fetch(`${API_URL}/participation/${questId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return (await res.json()) as Participation[];
  } catch (e) {
    throw e;
  }
};
