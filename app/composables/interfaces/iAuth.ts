import type { UserDTO } from "~~/types/UserDTO"

export const useIAuth = () => {
  const baseUrl = '/api/auth'

  async function signUp(user: UserDTO){
    return await $fetch(`${baseUrl}/signup`, {
      method: 'POST',
      body: user
    })
  }

  async function signIn(email: string, password: string){
    return await $fetch(`${baseUrl}/signin`, {
      method: 'POST',
      body: { email, password }
    })
  }

  async function rescueAccess(email: string){
    return await $fetch(`${baseUrl}/recovery/${email}`, {
      method: 'GET'
    })
  }

  return { signUp, signIn, rescueAccess }
}
