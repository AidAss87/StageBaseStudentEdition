export interface User {
  id: string;
  name: string;
  role: "guest" | "admin" | "stage1" | "stage2" | "stage3" | "stage4";
  image?: string;
  createdAt: number;
  updatedAt: number;
  email: string;
}
