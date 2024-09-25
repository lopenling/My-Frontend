import { defineStore } from 'pinia'
import { axios } from '@/lib/axios'
import type { User } from '@/stores/user'

export type Team = {
  name: string
  id: number
  role: keyof typeof TEAM_ROLES
  users: User[]
}

export type KeyedTeams = {
  [key: number]: Team
}

export interface TeamStoreState {
  teams: KeyedTeams
  userFilter: null | {
    label: User['fullName']
    value: User['id']
  }
}

export const TEAM_ROLES = {
  admin: 'admin',
  member: 'member',
}

/**
 * Teams store
 */
export const useTeamsStore = defineStore('teams', {
  persist: true,

  state: (): TeamStoreState => ({
    teams: {},
    userFilter: null,
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

    getTeam(id: Team['id']): Promise<Team> {
      return axios.get(`/v1/teams/${id}`).then(({ data }) => data)
    },

    /**
     * Create new team
     *
     * @param team
     */
    createTeam(team: Pick<Team, 'name'>): Promise<Team> {
      return axios.post('/v1/teams', team).then(({ data }) => data)
    },

    /**
     * Leave given team
     *
     * @param id Team ID to leave
     */
    leaveTeam(id: Team['id']): Promise<Team> {
      return axios.post(`/v1/teams/${id}/leave`).then(({ data }) => data)
    },

    /**
     * Rename given team
     *
     * @param id Team ID to rename
     * @param name New team name
     */
    renameTeam(id: Team['id'], name: string): Promise<Team> {
      return axios.patch(`/v1/teams/${id}`, { name }).then(({ data }) => data)
    },
  },

  getters: {
    /**
     * Get only teams, where user is admin
     */
    adminTeams(): KeyedTeams {
      return Object.fromEntries(
        Object.entries(this.teams).filter(([, value]) => value.role === TEAM_ROLES.admin),
      )
    },

    /**
     * Get only teams, where user is member
     */
    memberTeams(): KeyedTeams {
      return Object.fromEntries(
        Object.entries(this.teams).filter(([, value]) => value.role === TEAM_ROLES.member),
      )
    },

    /**
     * Check, if user has any teams where he is admin
     */
    hasAdminTeams(): boolean {
      return !!Object.keys(this.adminTeams).length
    },

    /**
     * Check, if user has any teams where he is member
     */
    hasMemberTeams(): boolean {
      return !!Object.keys(this.memberTeams).length
    },
  },
})
