<template>
  <Navbar expand="lg" background-color="body-tertiary">
    <Container type="fluid">
      <NavbarBrand to="/">{{ useRuntimeConfig().public.appName }}</NavbarBrand>
      <NavbarToggler />
      <NavbarCollapse>
        <NavbarNavList margin="e-auto b-2 b-lg-0">
          <NavItem>
            <NavLink to="/entrar">
              Entrar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/registrar">
              Registrar
            </NavLink>
          </NavItem>
        </NavbarNavList>
      </NavbarCollapse>
    </Container>
  </Navbar>
</template>
<script setup lang="ts">

</script>