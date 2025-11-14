<template>
  <Container>
    <h1>Entrar</h1>
    <AuthSigninForm @sign-in="signIn" />
    <Row class="text-center mb-1 mt-3">
      <Col>
        <NuxtLink to="/registrar">Não tem conta?</NuxtLink>
      </Col>
    </Row>
    <Row class="text-center">
      <Col>
        <NuxtLink to="/recuperar-senha">Esqueceu a senha?</NuxtLink>
      </Col>
    </Row>
  </Container>
</template>

<script lang="ts" setup>
import { useIAuth } from "~/composables/interfaces/iAuth";
import type { AuthResponse } from "~~/types/AuthResponse";

definePageMeta({
  // middleware: "signin-page",
});


const { fetch: refreshSession } = useUserSession();

async function signIn(credentials: { email: string; password: string }) {
  const { message, error} = await useIAuth().signIn(
    credentials.email,
    credentials.password
  ) as AuthResponse;

  if (error) {
    console.error(error.message)
  } else {
    await refreshSession();
    console.info(message);
    // Redirect to projects page after successful sign-in
    useRouter().push("/");
  }
}
</script>