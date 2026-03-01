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
import { useToast } from "~/composables/domain/toast";
import type { AuthResponse } from "~~/types/AuthResponse";
import { ToastMessageTypeEnum } from "~~/types/enums/ToastMessageTypeEnum";

definePageMeta({
  middleware: "signin-page",
});

const pageName = "Entrar"

onMounted(async() => {
  await useToast().execute()
});

onUpdated(async() => {
  await useToast().execute()
});

const { fetch: refreshSession } = useUserSession();

async function signIn(credentials: { email: string; password: string }) {
  const { message, error} = await useIAuth().signIn(
    credentials.email,
    credentials.password
  ) as AuthResponse;

  if (error) {
    await useToast().execute(error.message, ToastMessageTypeEnum.DANGER)
  } else {
    await refreshSession();
    await useToast().setToastCookies(message as string, ToastMessageTypeEnum.SUCCESS)
    useRouter().push("/projetos");
  }
}
</script>