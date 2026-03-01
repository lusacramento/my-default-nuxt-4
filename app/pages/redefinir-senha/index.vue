<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <AuthResetPasswordForm @reset-password="resetPassword"/>
  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from '~/composables/interfaces/iAuth';
import { useToast } from '~/composables/domain/toast';
import type { AuthResponse } from '~~/types/AuthResponse';
import { ToastMessageTypeEnum } from '~~/types/enums/ToastMessageTypeEnum';

const pageName = 'Redefinir Senha'


definePageMeta({
  middleware: 'reset-password'
})
const token = useRoute().query.token

  async function resetPassword(password: string, repeatPassword: string) {
const { message, error} = await useIAuth().resetPassword(token as string, password, repeatPassword) as AuthResponse

if(error){
  await useToast().execute(error.message, ToastMessageTypeEnum.DANGER)
}

if(message){
  await useToast().setToastCookies(message, ToastMessageTypeEnum.SUCCESS)
  useRouter().push('/entrar')
}
  
}
</script>

<style>

</style>