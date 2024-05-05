import { defineStore } from 'pinia'

/**
 * This store will only keep modals open and close state
 */
export const useModalsStore = defineStore('modals', {
  persist: false,

  state: () => ({
    newTeamModal: false,
  }),
})
