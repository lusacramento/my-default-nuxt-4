<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <AuthResetPasswordForm @reset-password="resetPassword"/>
  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from '~/composables/interfaces/iAuth';
import type { AuthResponse } from '~~/types/AuthResponse';

const pageName = 'Redefinir Senha'

definePageMeta({
  middleware: 'reset-password'
})
const token = useRoute().query.token

  async function resetPassword(password: string, repeatPassword: string) {
const { message, error} = await useIAuth().resetPassword(token as string, password, repeatPassword) as AuthResponse

if(error){
  console.error(error.message)
}

if(message){
  console.info(message)
}
  
}
</script>

<style>

</style>