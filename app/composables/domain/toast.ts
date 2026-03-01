import { ToastMessageTypeEnum } from "~~/types/enums/ToastMessageTypeEnum"
export const useToast = () => {
  // shared state so every call to useToast() references the same toast
  const state = useState("toast", () => ({
    header: "" as ToastMessageTypeEnum | "",
    body: "",
    color: "white",
    backgroundColor: "primary" as "primary" | "success" | "warning" | "danger",
    isShow: false,
    isLoaded: false,
  }));

  function getToastCookies() {
    const body = (useCookie("toast-body").value as string) || "";
    const type = useCookie("toast-type").value as ToastMessageTypeEnum | undefined;
    return { body, type };
  }

  function setToastCookies(body: string, type?: ToastMessageTypeEnum) {
    useCookie("toast-body", { maxAge: 60 }).value = body;
    useCookie("toast-type", { maxAge: 60 }).value = type;
  }

  function clearToastCookies() {
    useCookie("toast-body", { maxAge: 60 }).value = "";
    useCookie("toast-type", { maxAge: 60 }).value = "";
  }

  async function execute(body?: string, type?: ToastMessageTypeEnum) {
    if(!body && !type) {
      const cookies = await getToastCookies();
      body = cookies.body;
      type = cookies.type;
    }

    if (body === "") return;

    state.value.body = await body as string;
    switch (type) {
      case ToastMessageTypeEnum.SUCCESS:
        loadSuccess();
        break;
      case ToastMessageTypeEnum.WARNING:
        loadWarning();
        break;
      case ToastMessageTypeEnum.DANGER:
        loadDanger();
        break;
      default:
        loadDefault();
        break;
    }    await clearToastCookies();

      await show();
  }

  function loadSuccess() {
    state.value.header = ToastMessageTypeEnum.SUCCESS;
    state.value.backgroundColor = "success";
  }

  function loadWarning() {
    state.value.header = ToastMessageTypeEnum.WARNING;
    state.value.backgroundColor = "warning";
  }

  function loadDanger() {
    state.value.header = ToastMessageTypeEnum.DANGER;
    state.value.backgroundColor = "danger";
  }

  function loadDefault() {
    state.value.header = ToastMessageTypeEnum.INFO;
    state.value.backgroundColor = "primary";
  }

  async function show() {
    state.value.isShow = await true;
  }

  return {
    state,
    getToastCookies,
    setToastCookies,
    clearToastCookies,
    execute: execute,
    show,
  };
};
