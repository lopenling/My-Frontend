import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core"
import { defineStore } from 'pinia';
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"

export const useApolloClient = defineStore('apolloClient', {
    actions: {
        getHeaders() {
            const headers = {}
            const token = localStorage.getItem('access_token');
            if (token) {
                headers["Authorization"] = `Bearer ${token}`
            }
            return headers
        }, 
        apolloClient() {
            // Create an http link:
            const httpLink = new HttpLink({
                uri: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
                fetch: (uri, options) => {
                    options.headers = this.getHeaders()
                    return fetch(uri, options)
                },
            })

            const errorLink = onError((error) => {
                if (process.env.NODE_ENV !== "production") {
                    logErrorMessages(error)
                }
            })

            // Create the apollo client
            return new ApolloClient({
                cache: new InMemoryCache(),
                link: errorLink.concat(httpLink)
            })
        }
    }
})

// function getHeaders() {
//     const headers = {}
//     const token = localStorage.getItem('access_token');
//     if (token) {
//         headers["Authorization"] = `Bearer ${token}`
//     }
//     return headers
// }

// // Create an http link:
// const httpLink = new HttpLink({
//     uri: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
//     fetch: (uri, options) => {
//         options.headers = getHeaders()
//         return fetch(uri, options)
//     },
// })

// const errorLink = onError((error) => {
//     if (process.env.NODE_ENV !== "production") {
//         logErrorMessages(error)
//     }
// })

// // Create the apollo client
// export const apolloClient = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: errorLink.concat(httpLink),
// })