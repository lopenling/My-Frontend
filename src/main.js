import { createApp, provide, h } from "vue"
import { DefaultApolloClient, provideApolloClient } from "@vue/apollo-composable"
import { useApolloClient } from "./stores/apollo-client"
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
provideApolloClient(useApolloClient().apolloClient())

app.mount('#app');