<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <AuthSignupForm @sign-up="register" />

  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from "~/composables/interfaces/iAuth"
import type { AuthResponse } from "~~/types/AuthResponse";
import type { UserDTO } from "~~/types/UserDTO";

const pageName = 'Registrar'

async function register(user: UserDTO) {
  const { message, error } = await useIAuth().signUp(user) as AuthResponse
  if (message)
    useRouter().push('/')
  if (error)
    console.error(error.message)
}
</script>