import { defineStore } from "pinia";
import webAuth from "auth0-js";

const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: window.location.origin,
  audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
  responseType: "token id_token",
  scope: "openid profile",
};
const auth0Client = new webAuth.WebAuth(auth0Config);

export const useAuth0Store = defineStore("auth0", {
  state: () => {
    return {
      isAuthenticated: false,
      loading: true,
      userProfile: null,
      accessToken: "",
      idToken: "",
    };
  },

  getters: {
    isAuthenticatedCheck() {
      // Check whether the current time is past the
      // access token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
      return new Date().getTime() < expiresAt;
    },
  },

  actions: {
    async handleAuthentication() {
      return new Promise((resolve, reject) => {
        auth0Client.parseHash(async (err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            this.userProfile = await this.getUserProfile();
            resolve();
          } else if (err) {
            reject(err);
          } else {
            this.isAuthenticated = false;
            resolve();
          }
        });
      });
    },

    setSession(authResult) {
      // Set the time that the access token will expire
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime(),
      );

      // Save tokens and expiration to localStorage
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
      localStorage.setItem("isAuthenticated", "true");

      this.accessToken = authResult.accessToken;
      this.idToken = authResult.idToken;
      this.isAuthenticated = true;
      this.loading = false;
    },

    async getUserProfile() {
      if (this.userProfile) {
        return this.userProfile;
      } else {
        return new Promise((resolve, reject) => {
          let access_token = localStorage.getItem("access_token");
          auth0Client.client.userInfo(access_token, (err, profile) => {
            if (profile) {
              this.userProfile = profile;
              resolve(profile);
            } else if (err) {
              console.log(err);
              reject(err);
            }
          });
        });
      }
    },
    passwordlessLogin(email) {
      return new Promise((resolve, reject) => {
        auth0Client.passwordlessStart(
          {
            connection: "email",
            send: "code",
            email: email,
          },
          function (err, res) {
            if (err) {
              reject(err);
            } else {
              resolve(res.email);
            }
          },
        );
      });
    },
    async verifyPasswordlessCode(email, code) {
      return new Promise((resolve, reject) => {
        auth0Client.passwordlessLogin(
          {
            connection: "email",
            email: email,
            verificationCode: code,
          },
          function (err, res) {
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
        connection: "google-oauth2",
      });
    },

    loginWithMeta() {
      auth0Client.authorize({
        connection: "facebook",
      });
    },

    login() {
      auth0Client.authorize();
    },

    logout() {
      // Remove tokens and expiration from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("isAuthenticated");

      this.accessToken = "";
      this.idToken = "";
      this.isAuthenticated = false;

      auth0Client.logout({
        returnTo: window.location.origin + "/login",
      });
    },
  },
});
