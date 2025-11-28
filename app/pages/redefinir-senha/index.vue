<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <AuthResetPasswordForm @reset-password="resetPassword"/>
  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from '~/composables/interfaces/iAuth';
import { useMyToastStore } from '~/stores/toast';
import type { AuthResponse } from '~~/types/AuthResponse';

const pageName = 'Redefinir Senha'

const toast = useMyToastStore()

definePageMeta({
  middleware: 'reset-password'
})
const token = useRoute().query.token

  async function resetPassword(password: string, repeatPassword: string) {
const { message, error} = await useIAuth().resetPassword(token as string, password, repeatPassword) as AuthResponse

if(error){
  await toast.load(error.message, 'erro')
  toast.show()
}

if(message){
  await toast.load(message, 'sucesso')
  useRouter().push('/entrar')
}
  
}
</script>

<style>

</style>