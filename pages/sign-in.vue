<template>
  <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
    <!-- Form -->
    <form id="emailForm" @submit.prevent="login">
      <FormInput
        id="email"
        v-model="email"
        label="Email address"
        class="mb-8"
        type="email"
        :required="true"
        :autofocus="true"
      />

      <div class="">
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Continue
        </button>
      </div>
    </form>
    <form action=""></form>

    <!-- Divider -->
    <div class="relative mt-6">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-stone-200"></div>
      </div>
      <div class="font-regular relative flex justify-center text-sm leading-6">
        <span class="bg-white px-6 text-stone-500">Or sign in with</span>
      </div>
    </div>

    <!-- Social buttons -->
    <div class="mt-6 grid grid-cols-2 gap-4">
      <a
        href="#"
        class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 shadow-sm ring-1 ring-inset ring-stone-300 transition hover:bg-stone-50 hover:text-stone-700 focus-visible:outline focus-visible:-outline-offset-1"
      >
        <IconsGoogle />
        <span class="text-sm font-semibold leading-6">Google</span>
      </a>
      <a
        href="#"
        class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 shadow-sm ring-1 ring-inset ring-stone-300 transition hover:bg-stone-50 hover:text-stone-700 focus-visible:outline focus-visible:-outline-offset-1"
      >
        <IconsMeta />
        <span class="text-sm font-semibold leading-6">Meta</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { GET_USER_BY_EMAIL } from "~/queries/users.gql";
import { gql } from "nuxt-graphql-request/utils";
import queryLaunches from "~/queries/users.gql";

const { $graphql } = useNuxtApp();

buildHead({
  title: "Sign in",
});

definePageMeta({
  layout: "auth",
});

const email = ref("");

async function login() {
  try {
    const res = await useAuthStore().login(email.value);
    // @TODO: In here we need to determine if
    // - new user
    // - magic link login
    // - password login
    // need to check that from DB

    // Get user from Hasura
    const query = gql`
      query userByEmail {
        users(where: { email: { _eq: "${email.value}" } }) {
          email
          default_login_method
        }
      }
    `;
    const data = await $graphql.default.request(query);

    // If user doesn't exist. Make new one
    if (!data.users.length) {
      const createUserQuery = gql`
          mutation {
            insert_users(objects: [{ email: "${email.value}" }]) {
              returning {
                email
                default_login_method
              }
            }
          }
        `;

      await $graphql.default.request(createUserQuery);
      return navigateTo({
        name: "login-link",
        query: { email: res.email },
      });
    }

    // Check user default login method
    const loginMethod = data.users[0].default_login_method;
    if (loginMethod === "password") {
      return navigateTo({
        name: "login-password",
        query: { email: res.email },
      });
    }

    // Default to login-link
    return navigateTo({
      name: "login-link",
      query: { email: res.email },
    });
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
/*
.login-container {
  width: 100vw;
  height: 100vh;
} */
</style>
