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
import { useMyToastStore } from '~/stores/toast';
import type { AuthResponse } from '~~/types/AuthResponse';

const pageName = "Recuperar Acesso"

const toast = useMyToastStore()

onMounted(() => {
  if (toast.isLoaded) toast.show();
});

async function rescueAccess(email: string) {
  const { error, message } = await useIAuth().rescueAccess(email) as AuthResponse;

  if (error) {
    await toast.load(error.message, 'erro')
    toast.show()
  }

  if (message) {
    await toast.load(message, 'sucesso')
    useRouter().push('/')
  }
}
</script>