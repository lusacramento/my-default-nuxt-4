<template>
  <Container>
    <h1>Registrar</h1>
    <AuthSignupForm @sign-up="register" />

  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from "~/composables/interfaces/iAuth"
import type { AuthResponse } from "~~/types/AuthResponse";
import type { UserDTO } from "~~/types/UserDTO";

async function register(user: UserDTO) {
  const { message, error } = await useIAuth().signUp(user) as AuthResponse
  if (message)
    useRouter().push('/')
  if (error)
    console.error(error.message)
}
</script>