export interface Quest {
  id: string;
  title: string;
  description: string;
  image?: string;
  duration?: number;
  reviewScore?: number;
  reviewCount?: number;
  approved: boolean;
}
