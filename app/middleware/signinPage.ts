import { Messages } from "~~/types/enums/Messages"

export default defineNuxtRouteMiddleware(async (to) => {
    if(to.query.isVerified){
        await useMyToastStore().load(Messages.VERIFIED_USER, 'alerta')
    } 
    
    return
})
