export interface SignInRequest {
  emailOrNickname: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface EmailResendRequest {
  email: string;
}

export type UserRole = 'PLAYER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  nickname: string;
  role: UserRole;
  avatarLink: string | null;
}
