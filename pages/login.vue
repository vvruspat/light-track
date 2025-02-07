<script lang="ts" setup>
import { ref } from "vue";
import { retrieveLaunchParams } from '@telegram-apps/sdk';

definePageMeta({
  title: "Login",
  description: "Login to your account",
  middleware: ["auth"],
});

const { initDataRaw, initData } = retrieveLaunchParams();

console.log("initDataRaw: ", initDataRaw);
console.log("initData: ", initData);
// const supabase = useSupabaseClient();

// const email = ref("");
// const password = ref("");
const authError = ref("");

// const router = useRouter();

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  console.log("Form submitted");

  // const { error } = await supabase.auth.setSession({ access_token, refresh_token });

  // const { error } = await supabase.auth.signInWithPassword({
  //   email: email.value,
  //   password: password.value,
  // });

  // if (error) {
  //   authError.value = error.message;
  // } else {
  //   router.push("/");
  // }
};
</script>

<template>
  <UContainer>
    <UCard>
      <StackContainer justify="center" align-items="center">
        <template #header>
          <h1>Login</h1>
        </template>
        <UAlert v-if="authError" type="error">{{ authError }}</UAlert>
        <form @submit.prevent="handleSubmit">
          <!-- <UInput v-model="email" type="text" placeholder="Username" />
          <UInput v-model="password" type="password" placeholder="Password" />
          <button type="submit">Login</button> -->
          <UButton type="submit">Login</UButton>
        </form>
      </StackContainer>
    </UCard>
  </UContainer>
</template>
