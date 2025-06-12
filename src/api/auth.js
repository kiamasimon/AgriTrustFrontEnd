import api from './api'

const auth = {
    login(credentials) {
        return api.post('/farmer/login/', credentials)
    },
    register(userData) {
        return api.post('/farmer/register/', userData)
    },
    getProfile() {
        return api.get('/farmer/profile/')
    },
    getHederaAccount() {
        return api.get('/onboarding/hedera-account/')
    },
    logout() {
        return api.post('/onboarding/logout/')
    }
}
export default auth;