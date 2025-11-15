<template>
  <form>
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
          v-model="password"
          tabindex="3"
          :placeholder="components.password.placeholder"
          :type="components.password.type"
          :class="components.password.isValid ? 'is-valid' : 'is-invalid'"
        />
      </BInputGroup>
      <b-div v-if="!components.password.isValid"
        ><span
          ><small>{{ components.password.errorMessage }}</small></span
        >
      </b-div>
    </b-div>
    <b-div margin="b-3">
      <BFormLabel :for="components.repeatPassword.id">
        {{ components.repeatPassword.label }}
      </BFormLabel>
      <BInputGroup>
        <BInputGroupText>
          <b-button>
            <BIcon
              :icon="passwordIcon"
              @click.prevent="alterPasswordVisibility"
            />
          </b-button>
        </BInputGroupText>
        <BFormInput
          :id="components.repeatPassword.id"
          v-model="repeatPassword"
          tabindex="4"
          :type="components.repeatPassword.type"
          :placeholder="components.repeatPassword.placeholder"
          :class="components.repeatPassword.isValid ? 'is-valid' : 'is-invalid'"
        />
      </BInputGroup>
      <b-div v-if="!components.repeatPassword.isValid"
        ><span
          ><small>{{ components.repeatPassword.errorMessage }}</small></span
        ></b-div
      >
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
        @click.prevent="$emit('resetPassword', password, repeatPassword)"
        >Redefinir</b-button
      >
    </b-div>
  </form>
</template>

<script lang="ts" setup>
import { useValidations } from "~/composables/domain/validations";
import { Messages } from "~~/types/enums/Messages";
const password = ref()
const repeatPassword = ref();

const components = ref({
  password: {
    id: "passwordInput",
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha aqui",
    isValid: computed(() => validations.password(password.value)),
    errorMessage: Messages.INCOMPATIBLE_PASSWORD_FORMAT,
  },
  repeatPassword: {
    id: "repeatPasswordInput",
    label: "Senha",
    type: "password",
    placeholder: "Repita sua senha aqui",
    isValid: computed(() =>
      validations.areEqualsTwoStrings(password.value, repeatPassword.value)
    ),
    errorMessage: Messages.INVALID_REPEAT_PASSWORD,
  },
});

const validations = useValidations();

const areAllValid = computed(
  () =>
    components.value.password.isValid && components.value.repeatPassword.isValid
);

const passwordIcon = ref("mdi:eye-off") as Ref<"mdi:eye" | "mdi:eye-off">;

function alterPasswordVisibility() {
  if (passwordIcon.value === "mdi:eye") {
    components.value.password.type = "text";
    components.value.repeatPassword.type = "text";
    passwordIcon.value = "mdi:eye-off";
  } else {
    components.value.password.type = "password";
    components.value.repeatPassword.type = "password";
    passwordIcon.value = "mdi:eye";
  }
}

defineEmits(["resetPassword"]);
</script>
