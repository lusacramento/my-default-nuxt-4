<template>
  <Navbar expand="lg" background-color="body-tertiary" fixed="top">
    <Container type="fluid">
      <NavbarBrand>Navbar</NavbarBrand>
      <NavbarToggler />
      <NavbarCollapse>
        <NavbarNavList margin="e-auto b-2 b-lg-0">
          <NavItem>
            <NavLink active>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/">
              Link
            </NavLink>
          </NavItem>
          <NavItemDropdown>
            <NavItemDropdownToggle>Dropdown</NavItemDropdownToggle>
            <DropdownMenu>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem to="/">
                Another action
              </DropdownItem>
              <DropdownItemDivider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </NavItemDropdown>
          <NavItem>
            <NavLink disabled>
              Disabled
            </NavLink>
          </NavItem>
        </NavbarNavList>
      </NavbarCollapse>
    </Container>
  </Navbar>
</template>