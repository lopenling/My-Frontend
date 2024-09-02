<template>
  <Menu as="div" class="relative">
    <div class="flex gap-3">
      <MenuButton
        class="group relative flex rounded-md bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <span class="absolute -inset-1.5"></span>
        <span class="sr-only">Open user menu</span>
        <div class="flex shrink-0 size-8">
          <img
            :src="
              user.avatar ||
              'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            "
            alt="User profile picture"
            class="rounded-md transition size-8 group-hover:opacity-85"
          />
        </div>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem>
          <router-link
            to="/my-account"
            exact-active-class="border-primary-500 font-medium text-stone-900 bg-stone-100"
            class="border-transparent block border-l-2 px-4 py-2 text-sm text-stone-700"
          >
            My account
          </router-link>
        </MenuItem>
        <MenuItem>
          <router-link
            to="/teams"
            exact-active-class="border-primary-500 font-medium text-stone-900 bg-stone-100"
            class="border-transparent block border-l-2 px-4 py-2 text-sm text-stone-700"
          >
            Teams
          </router-link>
        </MenuItem>

        <div class="my-2 border-b border-gray-100"></div>
        <MenuItem>
          <a
            href="/log-out"
            class="block border-l-2 border-transparent px-4 py-2 text-sm text-stone-700"
            @click.prevent="logOut"
          >
            Sign out
          </a>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { MenuButton, Menu, MenuItems, MenuItem } from '@headlessui/vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const user = useUserStore().user!
const router = useRouter()

const logOut = () => {
  useUserStore()
  .logOut()
  .then(() => {
      // In case of manual logout, nuke all storage
      window.localStorage.clear()
      router.push('/login')
    })
}
</script>
