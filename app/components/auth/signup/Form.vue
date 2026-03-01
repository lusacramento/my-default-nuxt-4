<template>
  <form>
    <b-div margin="b-3">
      <BFormLabel :for="components.name.id">
        {{ components.name.label }}
      </BFormLabel>
      <BInputGroup>
        <BInputGroupText>
          <b-button>
            <BIcon icon="mdi:user" />
          </b-button>
        </BInputGroupText>
        <BFormInput
          :id="components.name.id"
          v-model="user.name"
          autofocus="true"
          tabindex="1"
          :placeholder="components.name.placeholder"
          :type="components.name.type"
          :class="components.name.isValid ? 'is-valid' : 'is-invalid'"
          autocomplete="username"
        />
      </BInputGroup>
      <b-div v-if="!components.name.isValid"
        ><span
          ><small>{{ components.name.errorMessage }}</small></span
        ></b-div
      >
    </b-div>
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
          v-model="user.email"
          :class="components.email.isValid ? 'is-valid' : 'is-invalid'"
          :placeholder="components.email.placeholder"
          :type="components.email.type"
          tabindex="2"
          autocomplete="username"
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
          v-model="user.password"
          tabindex="3"
          :placeholder="components.password.placeholder"
          :type="components.password.type"
          :class="components.password.isValid ? 'is-valid' : 'is-invalid'"
          autocomplete="new-password"
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
          v-model="user.repeatPassword"
          tabindex="4"
          :type="components.repeatPassword.type"
          :placeholder="components.repeatPassword.placeholder"
          :class="components.repeatPassword.isValid ? 'is-valid' : 'is-invalid'"
          autocomplete="new-password"
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
        @click.prevent="$emit('signUp', user)"
        >Cadastrar</b-button
      >
    </b-div>
  </form>
</template>

<script lang="ts" setup>
import { useValidations } from "~/composables/domain/validations";
import { Messages } from "~~/types/enums/Messages";
import type { UserDTO } from "~~/types/UserDTO";

const user = ref({
  name: "luc",
  email: "lucianoblackblack@gmail.com",
  password: "luLU34#$",
  repeatPassword: "luLU34#$",
}) as Ref<UserDTO>;

const components = ref({
  name: {
    id: "nameInput",
    label: "Nome de Usuário",
    type: "text",
    placeholder: "Nome do usuário",
    isValid: computed(() => validations.isMoreTwoCaracters(user.value.name)),
    errorMessage: Messages.MORE_2_CHARS,
  },
  email: {
    id: "emailInput",
    label: "Email",
    type: "email",
    placeholder: "exemplo@exemplo.com",
    isValid: computed(() => validations.email(user.value.email)),
    errorMessage: Messages.INCOMPATIBLE_EMAIL_FORMAT,
  },
  password: {
    id: "passwordInput",
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha aqui",
    isValid: computed(() => validations.password(user.value.password)),
    errorMessage: Messages.INCOMPATIBLE_PASSWORD_FORMAT,
  },
  repeatPassword: {
    id: "repeatPasswordInput",
    label: "Confirmação de Senha",
    type: "password",
    placeholder: "Repita sua senha aqui",
    isValid: computed(
      () =>
        validations.areEqualsTwoStrings(
          user.value.password,
          user.value.repeatPassword
        ) && validations.password(user.value.repeatPassword)
    ),
    errorMessage: Messages.INVALID_REPEAT_PASSWORD,
  },
});

const validations = useValidations();

const areAllValid = computed(
  () =>
    components.value.name.isValid &&
    components.value.email.isValid &&
    components.value.password.isValid &&
    components.value.repeatPassword.isValid
);

const passwordIcon = ref("mdi:eye") as Ref<"mdi:eye" | "mdi:eye-off">;

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

defineEmits(["signUp"]);
</script>
