import { defineStore } from "pinia";

export const useMyToastStore = defineStore("myToastStore", {
  state: () => ({
    header: "",
    body: "",
    color: "white",
    backgroundColor: "primary" as "primary" | "success" | "warning" | "danger",
    isShow: false,
    isLoaded: false,
  }),

  actions: {
    async load(body: string, type?: "sucesso" | "alerta" | "erro") {
      this.body = body;
      switch (type) {
        case "sucesso":
          this.loadSuccess();
          break;
        case "alerta":
          this.loadWarning();
          break;
        case "erro":
          this.loadDanger();
          break;
        default:
          this.loadDefault();
          break;
      }

      this.isLoaded = await true;
    },

    loadSuccess() {
      this.header = "Sucesso";
      this.backgroundColor = "success";
    },

    loadWarning() {
      this.header = "Atenção";
      this.backgroundColor = "warning";
    },

    loadDanger() {
      this.header = "Erro";
      this.backgroundColor = "danger";
    },

    loadDefault() {
      this.header = "Mensagem";
      this.backgroundColor = "primary";
    },

    show() {
      this.isShow = true;
    },

    reset() {
      this.isLoaded = false;
      this.isShow = false;
    },
  },
});
