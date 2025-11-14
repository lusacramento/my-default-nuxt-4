<template>
  <Container>
    <h1>Registrar</h1>
    <AuthSignupForm @sign-up="register" />

  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from "~/composables/interfaces/iAuth"
import type { UserDTO } from "~~/types/UserDTO";

interface Response {
  message?: string,
  error?: {
    message: string
  }
}

async function register(user: UserDTO) {
  const { message, error } = await useIAuth().signUp(user) as Response
  if (message)
    useRouter().push('/')
  if (error)
    console.error(error.message)
}
</script>