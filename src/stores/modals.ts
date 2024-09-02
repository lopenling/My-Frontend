import { defineStore } from 'pinia'
import type { Team } from './teams'

/**
 * Typings for store state to use across the codebase
 */
export interface ModalStoreState {
  newTeamModal: boolean
  leaveTeamModal: false | Team
}

/**
 * This store will only keep modals open and close state
 */
export const useModalsStore = defineStore('modals', {
  persist: false,

  state: (): ModalStoreState => ({
    newTeamModal: false,
    leaveTeamModal: false,
  }),
})
