import { API_URL } from '@/api/constant';
import {
  CreateQuestBody,
  CreateTaskBody,
  Quest,
  QuestBody,
} from '@/types/quests';

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

    return (await response.json()) as Quest;
  } catch (e) {
    throw e;
  }
};

export const createTask = async (data: FormData) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      credentials: 'include',
      body: data,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as CreateTaskBody;
  } catch (e) {
    throw e;
  }
};

export const getTasks = async (questId: string) => {
  try {
    const response = await fetch(`${API_URL}/quest/${questId}/tasks`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as CreateTaskBody[];
  } catch (e) {
    throw e;
  }
};

export const getQuests = async () => {
  try {
    const response = await fetch(`${API_URL}/quest`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as QuestBody[];
  } catch (e) {
    throw e;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      credentials: 'include',
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

export const publishQuest = async (questId: string) => {
  try {
    const response = await fetch(`${API_URL}/quest`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questId,
        isPublished: true,
      }),
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

export const getQuest = async (questId: string) => {
  try {
    const response = await fetch(`${API_URL}/quest/${questId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as QuestBody;
  } catch (e) {
    throw e;
  }
};
