export interface CommentsRequest {
  userId: string;
  questId: string;
  content: string;
  grade: number;
}

export interface CommentsResponse {
  id: string;
  userId: string;
  questId: string;
  content: string;
  grade: number;
  createdAt: string;
  user: {
    nickname: string;
    avatarLink: string | null;
  };
}
