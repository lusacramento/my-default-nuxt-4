<template>
  <Container>
    <LayoutsHeader :page-name="pageName"/>
    <AuthSigninForm @sign-in="signIn" />
    <Row class="text-center mb-1 mt-3">
      <Col>
        <NuxtLink to="/registrar">Não tem conta?</NuxtLink>
      </Col>
    </Row>
    <Row class="text-center">
      <Col>
        <NuxtLink to="/recuperar-acesso">Esqueceu a senha?</NuxtLink>
      </Col>
    </Row>
    <TemplatesToast id="signin-toast" />
  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from "~/composables/interfaces/iAuth";
import { useMyToastStore } from "~/stores/toast";
import type { AuthResponse } from "~~/types/AuthResponse";

definePageMeta({
  middleware: "signin-page",
});

const pageName = "Página inicial"

const toast = useMyToastStore();


onMounted(() => {
  if (toast.isLoaded) toast.show();
});

const { fetch: refreshSession } = useUserSession();

async function signIn(credentials: { email: string; password: string }) {
  const { message, error} = await useIAuth().signIn(
    credentials.email,
    credentials.password
  ) as AuthResponse;

  if (error) {
    await toast.load(error.message, 'erro')
    toast.show()
    return
  } else {
    await refreshSession();
    await toast.load(message as string, 'sucesso')
    useRouter().push("/projetos");
  }
}
</script>