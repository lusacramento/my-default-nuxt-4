import { useToast } from "~/composables/domain/toast";
import { Messages } from "~~/types/enums/Messages";
import { ToastMessageTypeEnum } from "~~/types/enums/ToastMessageTypeEnum";

export default defineNuxtRouteMiddleware(async () => {
    const {loggedIn} = useUserSession();

    if (!loggedIn.value) {
        const toast = useToast();
        await toast.setToastCookies(Messages.DENIED_ACCESS, ToastMessageTypeEnum.WARNING);
        return navigateTo('/entrar');
    }

})
