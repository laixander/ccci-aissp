<template>
  <UContainer class="max-w-md mx-auto py-12 space-y-6">
    <h1 class="text-2xl font-semibold">Login</h1>

    <UForm :state="formState" @submit="handleLogin" class="space-y-4">
      <UFormField label="Username" name="username">
  <UInput v-model="formState.username" />
</UFormField>

<UFormField label="Password" name="password">
  <UInput v-model="formState.password" type="password" />
</UFormField>

      <UButton type="submit" :loading="loading" block>Login</UButton>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'centered',
})

const formState = reactive({
  username: '',
  password: ''
})
// const username = ref('')
// const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  const { username, password } = formState

  await new Promise((r) => setTimeout(r, 500))

  if (username === 'admin' && password === 'password') {
    login({ username })
    router.push('/')
  } else {
    error.value = 'Invalid username or password'
  }

  loading.value = false
}

</script>
