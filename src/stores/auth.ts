import { defineStore } from "pinia";
import { WebAuth } from "auth0-js";

type PasswordlessStartResponse = {
  Id: string;
  email: string;
  emailVerified: boolean;
};

const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback`,
  audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
  responseType: "token id_token",
  scope: "openid profile",
  // issuerBaseURL: 'https://dev--zdifqkq.us.auth0.com/',
  // tokenSigningAlg: 'RS256',

};
const auth0Client = new WebAuth(auth0Config);

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      accessToken: "",
      idToken: "",
    };
  },
  actions: {
    login(email: string): Promise<PasswordlessStartResponse> {
      return new Promise((resolve, reject) => {
        auth0Client.passwordlessStart(
          {
            connection: "email",
            send: "code",
            email,
          },
          (err: any, res: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          },
        );
      });
    },
    loginWithGoogle() {
      auth0Client.authorize({
        connection: 'google-oauth2',
      });
    },

    loginWithMeta() {
      auth0Client.authorize({
        connection: 'facebook',
      });
    },
  },
});
