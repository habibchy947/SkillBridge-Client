export interface TutorsPublic {
  id: string | number
  userId: string | number;
  bio: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  categories: {
    id: string | number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  reviews: {
    id: string | number;
    bookingId: string | number;
    studentId: string | number;
    tutorId: string | number;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  }[]
  user: {
    id: string | number;
    name: string;
    image: string;
  };
}