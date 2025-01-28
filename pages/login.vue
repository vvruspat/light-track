<script lang="ts" setup>
import { ref } from "vue";

const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");
const authError = ref("");

const router = useRouter();

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  console.log("Form submitted");

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    authError.value = error.message;
  } else {
    router.push("/");
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <UInput v-model="email" type="text" placeholder="Username" />
      <UInput v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
