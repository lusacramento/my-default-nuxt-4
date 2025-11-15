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
          v-model="email"
          :class="components.email.isValid ? 'is-valid' : 'is-invalid'"
          :placeholder="components.email.placeholder"
          :type="components.email.type"
          tabindex="2"
        />
      </BInputGroup>
      <b-div v-if="!components.email.isValid"
        ><span
          ><small>{{ components.email.errorMessage }}</small></span
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
        :disabled="!components.email.isValid"
        @click.prevent="$emit('rescue', email)"
        >Recuperar</b-button
      >
    </b-div>
  </form>
</template>

<script lang="ts" setup>
import { useValidations } from "~/composables/domain/validations";
import { Messages } from "~~/types/enums/Messages";

const validations = useValidations();
const email = ref();

const components = ref({
  email: {
    id: "emailInput",
    label: "Email",
    type: "email",
    placeholder: "exemplo@exemplo.com",
    isValid: computed(() => validations.email(email.value)),
    errorMessage: Messages.INCOMPATIBLE_EMAIL_FORMAT,
  },
});

defineEmits(["rescue"]);
</script>