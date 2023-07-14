import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from "@auth0/auth0-vue"

import App from './App.vue'
import router from './router'

import './assets/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
.use(
    createAuth0({
      domain: import.meta.env.AUTH0_DOMAIN,
      clientId: import.meta.env.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
      },
    })
  )


app.mount('#app')
