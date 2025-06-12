import { defineStore } from 'pinia'
import axios from 'axios'
import authService from '@/api/auth'


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isLoading: false,
        error: null,
        // Add Hedera-specific fields
        hederaAccountId: localStorage.getItem('hedera_account_id') || null,
        did: localStorage.getItem('did') || null,
        balance: localStorage.getItem('balance') || 0
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user,
        // Add Hedera getters
        hederaInfo: (state) => ({
            accountId: state.hederaAccountId,
            did: state.did,
            balance: state.balance
        })
    },
    actions: {
        async login(credentials) {
            this.isLoading = true
            this.error = null
            try {
                const response = await authService.login(credentials)
                this.token = response.data.access
                this.user = response.data.user

                // Store Hedera info if available
                if (response.data.hedera_account_id) {
                    this.hederaAccountId = response.data.hedera_account_id
                    localStorage.setItem('hedera_account_id', this.hederaAccountId)
                }
                if (response.data.did) {
                    this.did = response.data.did
                    localStorage.setItem('did', this.did)
                }
                if (response.data.balance) {
                    this.balance = response.data.balance
                    localStorage.setItem('balance', this.balance)
                }

                localStorage.setItem('token', this.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return true
            } catch (error) {
                this.error = error.response?.data?.detail || 'Login failed'
                return false
            } finally {
                this.isLoading = false
            }
        },
        async register(userData) {
            this.isLoading = true
            this.error = null
            try {
                const response = await authService.register(userData)
                // Store Hedera info from registration if needed
                if (response.data.hedera_account_id) {
                    this.hederaAccountId = response.data.hedera_account_id
                    localStorage.setItem('hedera_account_id', this.hederaAccountId)
                }
                return true
            } catch (error) {
                this.error = error.response?.data || 'Registration failed'
                return false
            } finally {
                this.isLoading = false
            }
        },
        async fetchUser() {
            this.isLoading = true
            try {
                const response = await authService.getProfile()
                this.user = response.data
            } catch (error) {
                this.logout()
            } finally {
                this.isLoading = false
            }
        },
        logout() {
            this.user = null
            this.token = null
            this.hederaAccountId = null
            this.did = null
            this.balance = 0
            localStorage.removeItem('token')
            localStorage.removeItem('hedera_account_id')
            localStorage.removeItem('did')
            localStorage.removeItem('balance')
            delete axios.defaults.headers.common['Authorization']
        },
        // Add Hedera-specific action
        async updateHederaBalance() {
            try {
                const response = await authService.getHederaAccount()
                this.balance = response.data.balance
                localStorage.setItem('balance', this.balance)
                return this.balance
            } catch (error) {
                console.error('Failed to update Hedera balance:', error)
                return null
            }
        }
    }
})