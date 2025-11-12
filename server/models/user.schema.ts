import { defineMongooseModel } from "~~/node_modules/nuxt-mongoose/dist/runtime/server/services/model";
import type { User } from "~~/types/User";

export const UserSchema = defineMongooseModel<User>('user', {
  
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    rescueToken: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
)
