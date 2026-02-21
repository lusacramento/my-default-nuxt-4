export default defineNuxtRouteMiddleware(async () => {
    const {loggedIn} = useUserSession();
    const toast = useMyToastStore();

    if (!loggedIn.value) {
        await   toast.load('Você fazer o login para acessar esta página', 'alerta')
        return navigateTo('/entrar');
    }

})
