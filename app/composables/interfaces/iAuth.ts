import type { UserDTO } from "~~/types/UserDTO"

export const useIAuth = () => {
  const baseUrl = '/api/auth'

  async function signUp(user: UserDTO){
    return await $fetch(`${baseUrl}/signup`, {
      method: 'POST',
      body: user
    })
  }

  return { signUp }
}
