import { API_URL } from '@/api/constant';
import { CommentsRequest, CommentsResponse } from '@/types/comments';

export const createComment = async (data: CommentsRequest) => {
  try {
    const response = await fetch(`${API_URL}/comments`, {
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

    return (await response.json()) as CommentsResponse;
  } catch (e) {
    throw e;
  }
};

export const getComments = async (questId: string) => {
  try {
    const response = await fetch(`${API_URL}/comments/${questId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as CommentsResponse[];
  } catch (e) {
    throw e;
  }
};
