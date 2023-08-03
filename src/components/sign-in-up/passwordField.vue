<template>
    <div class="h-full bg-stone-100 login-container">
        <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
              <Logo />
              <h2
                class="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-stone-900"
              >
                Sign in to Lopenling
              </h2>
            </div>
        
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[426px]">
              <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <div class="text-center">
                  <div class="flex justify-center text-primary-400 pt-2 pb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-16 w-16"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path
                        d="M256 16c-8.6 0-17 2.8-24 7.9L177.9 64H334.1L280 23.9C273 18.8 264.6 16 256 16zM120 64h31l71.5-53C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L361 64h31c30.9 0 56 25.1 56 56v8.5l38.1 28.2c16.3 12.1 25.9 31.1 25.9 51.4V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V208.1c0-20.3 9.6-39.4 25.9-51.4L64 128.5V120c0-30.9 25.1-56 56-56zM448 214.5l-16 13.1V120c0-22.1-17.9-40-40-40H120c-22.1 0-40 17.9-40 40V227.7L64 214.5V148.4L35.4 169.5C23.2 178.6 16 192.9 16 208.1v8.4l1.6 1.3L232.7 394.5c6.6 5.4 14.8 8.3 23.3 8.3s16.7-2.9 23.3-8.3L494.4 217.8l1.6-1.3v-8.4c0-15.2-7.2-29.5-19.4-38.6L448 148.4v66.1zM16 448c0 26.5 21.5 48 48 48H448c26.5 0 48-21.5 48-48V237.2L289.4 406.9c-9.4 7.7-21.2 12-33.4 12s-24-4.2-33.4-12L16 237.2V448zM168 160H344c4.4 0 8 3.6 8 8s-3.6 8-8 8H168c-4.4 0-8-3.6-8-8s3.6-8 8-8zm0 80H344c4.4 0 8 3.6 8 8s-3.6 8-8 8H168c-4.4 0-8-3.6-8-8s3.6-8 8-8z"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="font-semibold mb-2 text-primary-800">Check your inbox</h3>
                  <p class="text-sm text-stone-700/70">
                    We have sent you a magic link. If you did not receive the email,
                    <button
                      @click="handleResendCode"
                      type="button"
                      class="font-medium underline underline-offset-2 decoration-primary-700/25 hover:text-primary-700 hover:decoration-primary-700/50 transition"
                      >send a new one</button
                    >.
                  </p>
                </div>
            
                <div>
                  <div class="relative mt-6">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-stone-200"></div>
                    </div>
                    <div
                      class="relative flex justify-center text-sm font-regular leading-6"
                    >
                      <span class="bg-white px-6 text-stone-500">Or</span>
                    </div>
                  </div>
                </div>
            
                <div class="mt-6 flex flex-col">
                  <form ref="passwordForm" @submit.prevent="handleLoginPassword">
                    <div class="mb-4">
                      <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-stone-900"
                        >Enter password</label
                      >
                      <div class="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          autofocus
                          class="block w-full rounded-md border-0 py-1.5 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="mb-8">
                      <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition"
                        >Sign in</button
                      >
                    </div>
                  </form>
                </div>
              </div>
          
              <p class="mt-10 text-center text-sm text-stone-500">
                <a
                  href="/login"
                  class="font-normal leading-6 text-stone-500 hover:text-stone-700 transition underline underline-offset-2 decoration-transparent hover:decoration-stone-700/25"
                  >Go back a step</a
                >
              </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Logo from '@/assets/logo.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useAuth0Store } from '@/stores/auth0';

  const route = useRoute()
  const router = useRouter()
  const auth0Store = useAuth0Store();

  //state
  const passwordForm = ref(null)
  const email = ref(null)
  let errorMessage = reactive({})
  let isError = ref(false)

  onMounted(() => {
    email.value = route.params.email
    console.log("email", email.value)
  })

  //handle login 
  async function handleLoginPassword() {
    //access code 
    let code = passwordForm.value[0].value
    //Passwordless email verification
    try {
      await auth0Store.verifyPasswordlessCode(email.value ,code);
      errorMessage.value = {}
      isError.value = false
    } catch(err) {
      alert(`${err.description}`)
      errorMessage.value = err
      isError.value = true
      console.log("code verification error : ", errorMessage.value)
    }
    
  }

 async function handleResendCode() {
    try {
      const resEmail = await auth0Store.passwordlessLogin(email.value);
      if(resEmail) {
        alert(`Code has been send to ${resEmail}`)
      }
    } catch(err) {
      alert(`${err}`)
    }
  }

</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
}
</style>