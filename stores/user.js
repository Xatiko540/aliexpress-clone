import { defineStore } from 'pinia'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} url
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} [username]
 * @property {string} [avatar]
 * @property {string} [role]
 */

export const useUserStore = defineStore('user', {
  state: () => ({
    /** @type {User|null} */
    user: null,

    isMenuOverlay: false,
    isLoading: false,

    /** @type {Product[]} */
    cart: [],

    /** @type {Product[]} */
    checkout: []
  }),
  actions: {
    async fetchUser() {
      try {
        /** @type {User} */
        const resp = await $fetch('/api/user', { credentials: 'include' })
        this.user = resp
      } catch (error) {
        this.user = null
      }
    }
  },
  persist: true
})