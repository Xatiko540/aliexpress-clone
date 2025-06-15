import { defineStore } from 'pinia'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} url
 */

export const useUserStore = defineStore('user', {
  state: () => ({
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
      const resp = await $fetch('/api/user', { credentials: 'include' });
      if (!resp) {
        this.user = null;
      } else {
        this.user = { ...resp };
      }
      } catch (error) {
        // console.error('Ошибка при получении пользователя:', error)
        this.user = null
      }
    }
  },
  persist: true
})