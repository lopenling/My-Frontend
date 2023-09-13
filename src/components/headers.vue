<template>
    <div>
      <Disclosure as="nav" class="bg-white shadow-sm" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <div class="flex">
              <div class="flex flex-shrink-0 items-center">
                <slot name="logo"></slot>
              </div>
              <div class="hidden sm:-my-px sm:ml-8 sm:flex sm:space-x-8">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'border-primary-500 text-stone-900'
                      : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700',
                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </div>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div class="flex gap-3">
                  <MenuButton
                    class="group relative flex rounded-md bg-white text-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img
                      v-if="user.picture"
                      class="h-8 w-8 rounded-md"
                      :src="user.picture"
                      alt=""
                    />
                    <span
                      v-else
                      class="flex h-8 w-8 items-center justify-center rounded-md bg-primary-400/25 text-center text-sm font-bold tracking-tight text-primary-600/75 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 group-hover:bg-primary-400/40 group-hover:text-primary-600/90"
                    >
                    </span>
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
                    <MenuItem
                        v-slot="{ active }"
                    >
                      <a
                            
                        :class="[
                          active ? 'bg-stone-100' : '',
                          'block px-4 py-2 text-sm text-stone-700',
                        ]"
                        >Glossary
                        </a
                      >
                    </MenuItem>
                    <MenuItem
                        v-slot="{ active }"
                    >
                      <a
                        @click="handleLogout"
                        :class="[
                          active ? 'bg-stone-100' : '',
                          'block px-4 py-2 text-sm text-stone-700',
                        ]"
                        >Sign out
                        </a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
  
        <DisclosurePanel class="sm:hidden">
          <div class="space-y-1 pb-4 pt-4">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-transparent text-stone-600 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800',
                'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { useAuth0Store } from '@/stores/auth0';
const auth0Store = useAuth0Store()

//props
const { navigation, userNavigation, user } = defineProps({
    user: {
        type: Object,
        default: null
    },
    navigation: {
      type: Array,
      default: [
        { name: "Dashboard", href: "#", current: true },
        { name: "Team", href: "#", current: false },
        { name: "Projects", href: "#", current: false },
        { name: "Calendar", href: "#", current: false },
      ],
    },
    userNavigation: {
      type: Array,
      default: [
        { name: "Your Profile", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Sign out", href: "#" },
      ],
    },
});


// logout
const handleLogout = () => {
  auth0Store.logout()
}

</script>
