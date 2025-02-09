
import {
  EmailResendRequest,
  SignInRequest,
  SignUpRequest,
  User,
} from '@/types/auth';
import { API_URL } from './constant';

export const signIn = async (data: SignInRequest) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
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

export const signUp = async (data: SignUpRequest) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const emailResend = async (data: EmailResendRequest) => {
  try {
    const response = await fetch(`${API_URL}/auth/email-resend`, {
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
export const emailApprove = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/email-approve/${token}`, {
      method: 'POST',
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

export const getMe = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as User;
  } catch (e) {
    throw e;
  }
};
