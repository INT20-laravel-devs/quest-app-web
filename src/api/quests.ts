import { API_URL } from '@/api/constant';
import { CreateQuestBody } from '@/types/quests';

export const createQuest = async (data: CreateQuestBody) => {
  try {
    const response = await fetch(`${API_URL}/quest`, {
      method: 'POST',
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
