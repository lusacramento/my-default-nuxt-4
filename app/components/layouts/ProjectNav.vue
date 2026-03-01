<template>
  <Navbar expand="lg" background-color="body-tertiary">
    <Container type="fluid">
      <NavbarBrand to="/">{{ useRuntimeConfig().public.appName }}</NavbarBrand>
      <NavbarToggler />
      <NavbarCollapse>
        <NavbarNavList margin="e-auto b-2 b-lg-0">
          <NavItem>
            <NavLink to="/projetos">
              Projetos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/" @click.prevent="signout">
              Sair
            </NavLink>
          </NavItem>
        </NavbarNavList>
      </NavbarCollapse>
    </Container>
  </Navbar>
</template>

<script lang="ts" setup>
import { useToast } from '~/composables/domain/toast';
import { ToastMessageTypeEnum } from '~~/types/enums/ToastMessageTypeEnum';

  const {clear, } = useUserSession();

  async function signout(){
    await clear()
    await useToast().setToastCookies('Sessão encerrada com sucesso', ToastMessageTypeEnum.INFO)
    await useRouter().replace('/entrar')
    
  }
</script>

<style>

</style>