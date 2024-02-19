import './assets/style.css'
import { createPinia } from 'pinia'
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/graphql/apollo'
import App from './App.vue'

import router from './router'

provideApolloClient(apolloClient)

const app = createApp({
  // setup() {
  //   provide(DefaultApolloClient, apolloClient)
  // },

  render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
