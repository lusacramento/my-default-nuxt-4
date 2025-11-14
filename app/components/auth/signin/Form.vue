<template>
  <form>
    <b-div margin="b-3">
      <BFormLabel :for="components.email.id">
        {{ components.email.label }}
      </BFormLabel>
      <BInputGroup>
        <BInputGroupText>
          <b-button>
            <BIcon icon="mdi:email" />
          </b-button>
        </BInputGroupText>
        <BFormInput
          :id="components.email.id"
          v-model="credentials.email"
          :class="components.email.isValid ? 'is-valid' : 'is-invalid'"
          :placeholder="components.email.placeholder"
          :type="components.email.type"
          tabindex="2"
          :autofocus="!autofocus"
        />
      </BInputGroup>
      <b-div v-if="!components.email.isValid"
        ><span
          ><small>{{ components.email.errorMessage }}</small></span
        ></b-div
      >
    </b-div>
    <b-div margin="b-3">
      <BFormLabel :for="components.password.id">
        {{ components.password.label }}
      </BFormLabel>
      <BInputGroup>
        <BInputGroupText>
          <b-button tabindex="7">
            <BIcon
              :icon="passwordIcon"
              @click.prevent="alterPasswordVisibility"
            />
          </b-button>
        </BInputGroupText>
        <BFormInput
          :id="components.password.id"
          v-model="credentials.password"
          tabindex="3"
          :placeholder="components.password.placeholder"
          :type="components.password.type"
          :class="components.password.isValid ? 'is-valid' : 'is-invalid'"
          :autofocus="autofocus"
        />
      </BInputGroup>
      <b-div v-if="!components.password.isValid"
        ><span
          ><small>{{ components.password.errorMessage }}</small></span
        >
      </b-div>
    </b-div>
    <b-div class="text-center">
      <b-button
        tabindex="6"
        color="primary"
        margin="1"
        @click.prevent="useRouter().back()"
        >Cancelar</b-button
      ><b-button
        tabindex="5"
        color="primary"
        margin="1"
        :disabled="!areAllValid"
        @click.prevent="$emit('signIn', credentials)"
        >Entrar</b-button
      >
    </b-div>
  </form>
</template>

<script lang="ts" setup>
import { useValidations } from "~/composables/domain/validations";
import { Messages } from "~~/types/enums/Messages";

onMounted(() => {
  credentials.value.email = (useRoute().query.email as string) || "";
});

const autofocus = computed(() => useRoute().query.email);

const credentials = ref({
  email: "",
  password: "",
});

const validations = useValidations();

const passwordIcon = ref("mdi:eye-off") as Ref<"mdi:eye" | "mdi:eye-off">;

const components = ref({
  email: {
    id: "emailInput",
    label: "Email",
    type: "email",
    placeholder: "exemplo@exemplo.com",
    isValid: computed(() => validations.email(credentials.value.email)),
    errorMessage: Messages.INCOMPATIBLE_EMAIL_FORMAT,
  },
  password: {
    id: "passwordInput",
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha aqui",
    isValid: computed(() => validations.password(credentials.value.password)),
    errorMessage: Messages.INCOMPATIBLE_PASSWORD_FORMAT,
  },
});

const areAllValid = computed(
  () => components.value.email.isValid && components.value.password.isValid
);

function alterPasswordVisibility() {
  if (passwordIcon.value === "mdi:eye") {
    components.value.password.type = "text";
    passwordIcon.value = "mdi:eye-off";
  } else {
    components.value.password.type = "password";
    passwordIcon.value = "mdi:eye";
  }
}

defineEmits(["signIn"]);
</script>
