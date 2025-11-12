import type { Types } from "mongoose";
export interface User {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  token?: string;
  rescueToken: string;
  isVerified: boolean;
}
