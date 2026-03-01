<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <Toast :id="`${props.id}-toast`" ref="toast">
      <ToastHeader :background-color="backgroundColor" :text-color="color">
        <strong class="me-auto">{{ header }}</strong>
        <small text-color="body-secondary">fechando em {{ counter }} segundos</small>
        <CloseButton dismiss="toast" :text-color="color" />
      </ToastHeader>
      <ToastBody :background-color="backgroundColor" :text-color="color">{{ body }}</ToastBody>
    </Toast>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from '~/composables/domain/toast';

onMounted(() => {
  isLoaded.value = true
})

const { state } = useToast()
const { header, body, color, backgroundColor, isLoaded } = toRefs(state.value)
const props = defineProps<{ id: string }>()
const toast = ref()

watch(() => [state.value.isShow, state.value.isLoaded], ([newValueIsShow, newValueIsLoaded]) => {
  if (newValueIsShow === true && newValueIsLoaded === true) {
    show()
  }
}, { immediate: true })

const counter = ref(5)
const second = 1000

function show() {
  toast.value.show()
  const interval = setInterval(async () => {
    counter.value = counter.value - 1

    if (counter.value === 0) {
      close()
      clearInterval(interval)
    }
  }, second)
}

async function close(){
  await toast.value.hide()
  DelayClose()
  state.value.isShow = false
}

function DelayClose(){
  setTimeout(() => {
        counter.value = 5
        // reset()
      }, 150)
}
</script>
