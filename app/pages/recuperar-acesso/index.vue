<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <AuthRescueAccessForm @rescue="rescueAccess" />
    <Row class="text-center mb-1 mt-3">
      <Col>
      <NuxtLink to="/registrar">Não tem conta?</NuxtLink>
      </Col>
    </Row>
    <Row class="text-center">
      <Col>
      <NuxtLink to="/entrar">Já tem conta?</NuxtLink>
      </Col>
    </Row>
  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from '~/composables/interfaces/iAuth';
import { useToast } from '~/composables/domain/toast';
import type { AuthResponse } from '~~/types/AuthResponse';
import { ToastMessageTypeEnum } from '~~/types/enums/ToastMessageTypeEnum';

const pageName = "Recuperar Acesso"

onMounted(async () => {
  await useToast().execute()
});

async function rescueAccess(email: string) {
  const { error, message } = await useIAuth().rescueAccess(email) as AuthResponse;

  if (error) {
    await useToast().execute(error.message, ToastMessageTypeEnum.DANGER)
  }

  if (message) {
    await useToast().setToastCookies(message, ToastMessageTypeEnum.SUCCESS)
    useRouter().push('/')
  }
}
</script>