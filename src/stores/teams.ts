import { defineStore } from 'pinia'
import { axios } from '@/lib/axios'

type Team = {
  name: string
  id: number
  role: 'admin' | 'user'
}

/**
 * Teams store
 */
export const useTeamsStore = defineStore('teams', {
  persist: true,

  state: () => ({
    teams: [] as Team[],
  }),

  actions: {
    /**
     * Get all user teams
     */
    getTeams(): Promise<Team[]> {
      return axios.get('/v1/teams').then(({ data }) => {
        this.teams = data
        return data
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
    adminTeams(): Team[] {
      return this.teams.filter((team) => {
        return team.role === 'admin'
      })
    },
  },
})
