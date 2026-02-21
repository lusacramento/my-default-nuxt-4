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
  const {clear} = useUserSession();
  const toast = useMyToastStore();


  async function signout(){
    clear()
    await toast.load('Sessão encerrada com sucesso', 'alerta')
  }
</script>

<style>

</style>