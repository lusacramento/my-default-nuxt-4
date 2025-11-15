<template>
  <Container>
    <h1>Recuperar acesso</h1>
    <AuthRescueAccessForm @rescue="rescueAccess"/>
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
import type { AuthResponse } from '~~/types/AuthResponse';

async function rescueAccess(email: string) {
  const { error, message } = await useIAuth().rescueAccess(email) as AuthResponse;

  if (error) {
    console.error(error.message)
  }

 if(message){
  console.info(message)
 }
}
</script>