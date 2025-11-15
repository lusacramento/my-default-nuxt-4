<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
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

const pageName = "Recuperar Acesso"

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