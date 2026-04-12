interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  isLoaned?: boolean;
  // videoUrl: string;
  // summary: string;
  // createdAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface ApiResponse {
  success: boolean;
  message: string?;
  data: any?,
  error: string?
}



export type { Book, AuthCredentials, ApiResponse };
