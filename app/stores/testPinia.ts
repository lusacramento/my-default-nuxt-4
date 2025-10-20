import { defineStore } from 'pinia'

export const useMyTestPiniaStore = defineStore('myTestPiniaStore',{
  state: () => ({ 
    data: [ 1, 2, 3]
  }),
  actions: {}
})
