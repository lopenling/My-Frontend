import { defineStore } from 'pinia'
import { axios } from '@/lib/axios'

export type Team = {
  name: string
  id: number
  role: 'admin' | 'member'
}

export type KeyedTeams = {
  [key: number]: Team
}

export interface TeamStoreState {
  teams: KeyedTeams
}

/**
 * Teams store
 */
export const useTeamsStore = defineStore('teams', {
  persist: true,

  state: (): TeamStoreState => ({
    teams: {},
  }),

  actions: {
    /**
     * Get all user teams
     */
    getTeams(): Promise<KeyedTeams> {
      return axios.get('/v1/teams').then(({ data }) => {
        // Map array of teams to object of teams
        const keyedTeams: KeyedTeams = {}
        data.forEach((team: Team) => {
          keyedTeams[team.id] = team
        })

        this.teams = keyedTeams

        return keyedTeams
      })
    },

    /**
     * Create new team
     *
     * @param team
     */
    createTeam(team: Pick<Team, 'name'>): Promise<Team> {
      return axios.post('/v1/teams', team).then(({ data }) => data)
    },
  },
  getters: {
    /**
     * Get only teams, where user is admin
     */
    adminTeams(): KeyedTeams {
      return Object.fromEntries(
        Object.entries(this.teams).filter(([, value]) => value.role === 'admin'),
      )
    },

    /**
     * Get only teams, where user is member
     */
    memberTeams(): KeyedTeams {
      return Object.fromEntries(
        Object.entries(this.teams).filter(([, value]) => value.role === 'member'),
      )
    },
  },
})
