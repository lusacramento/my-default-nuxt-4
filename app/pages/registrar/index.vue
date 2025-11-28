<template>
  <Container>
    <LayoutsHeader :page-name="pageName" />
    <AuthSignupForm @sign-up="register" />
    <Row class="text-center mb-1 mt-3">
      <Col>
        <NuxtLink to="/entrar">Já é cadastrado?</NuxtLink>
      </Col>
    </Row>
    <Row class="text-center">
      <Col>
        <NuxtLink to="/recuperar-acesso">Esqueceu a senha?</NuxtLink>
      </Col>
    </Row>
    <TemplatesToast id="registrar-toast"/>
  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from "~/composables/interfaces/iAuth"
import { useMyToastStore } from "~/stores/toast";
import type { AuthResponse } from "~~/types/AuthResponse";
import type { UserDTO } from "~~/types/UserDTO";

const pageName = 'Registrar'

const toast = useMyToastStore()

async function register(user: UserDTO) {
  const { message, error } = await useIAuth().signUp(user) as AuthResponse
  if (message){
    await toast.load(message, 'sucesso')
    useRouter().push('/')
    return
  }

  if (error)
    await toast.load(error.message, 'erro')
    toast.show()
    
}
</script>