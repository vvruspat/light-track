<script lang="ts" setup>
import { ref } from 'vue'

const supabase = useSupabaseClient()

const email = ref("");
const password = ref("");
const authError = ref("");

const router = useRouter()

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  console.log('Form submitted')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    authError.value = error.message
  } else {
    router.push('/')
  }

}

</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="email" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>