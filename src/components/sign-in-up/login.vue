<template>
  <div class="h-full bg-stone-100 login-container">
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2
          class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-stone-900"
        >
          Sign in to Lopenling
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[426px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form ref="form" @submit.prevent="handlePasswordlessLogin">
            <div class="mb-8">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-stone-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  autofocus
                  class="block w-full rounded-md border-0 py-1.5 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition"
                >Continue</button
              >
            </div>
          </form>

          <div>
            <div class="relative mt-6">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-stone-200"></div>
              </div>
              <div
                class="relative flex justify-center text-sm font-regular leading-6"
              >
                <span class="bg-white px-6 text-stone-500">Or sign in with</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <a
                @click="handleGoogleLogin"
                class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 hover:text-stone-700 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-stone-50 transition"
              >
                <svg
                  class="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 488 512"
                  aria-hidden="true"
                >
                  <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                <span class="text-sm font-semibold leading-6">Google</span>
              </a>

              <a
                @click="handleMetaLogin"
                class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 hover:text-stone-700 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-stone-50 transition"
              >
                <svg
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                  aria-hidden="true"
                >
                  <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.42 466.4 0 409.1 0 320.5C0 177.5 79.78 42.4 183.9 42.4C234.1 42.4 277.7 67.08 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.22 217.8 69.22 321.7C69.22 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.08 454.9 97.08C421.7 97.08 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"
                  ></path>
                </svg>
                <span class="text-sm font-semibold leading-6">Meta</span>
              </a>
            </div>
          </div>
        </div>
        <!--
        <p class="mt-10 text-center text-sm text-stone-500">
          New here?
          <a
            href="#"
            class="font-medium leading-6 text-primary-600 hover:text-primary-500 transition underline underline-offset-2 decoration-transparent hover:decoration-primary-500/25"
            >Account registration</a
          >
        </p>
      -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/assets/logo.vue';
import {ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0Store } from '@/stores/auth0';

  //STATE
  const form = ref(null)
  let email = ref(null)

  const auth0Store = useAuth0Store();
  const router = useRouter();
  //console.log("stautaL :", localStorage.getItem('access_token') )

//passwordless login
async function handlePasswordlessLogin() {
  
  email.value = form.value[0].value
  try {
     const resEmail = await auth0Store.passwordlessLogin(email.value);
    console.log(resEmail)
    if(resEmail) {
     router.push({name: 'password', params: {email: resEmail}})
    }
  } catch(err) {
    console.log("err : ", err)
  }
   
}
   
//login with google 
  function handleGoogleLogin() {
    auth0Store.loginWithGoogle();
  }
  //login with meta
  function handleMetaLogin() {
    auth0Store.loginWithMeta();
  }
</script>