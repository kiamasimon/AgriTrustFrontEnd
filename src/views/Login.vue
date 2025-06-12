<template>
  <div class="login">
      <div class="login-body">
        <a class="login-brand" href="index.html">
          <img class="img-responsive" src="@/assets/concept/img/logo.svg" alt="Elephant">
        </a>
        <div class="login-form">
          <form @submit.prevent="handleLogin">
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <div class="form-group">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="form.username" required>
              </div>
              <div class="form-group">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="form.password" required>
              </div>

              <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
                  <span v-if="!isLoading">Login</span>
                  <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </button>
          </form>
        </div>
      </div>
      <div class="login-footer">
        Don't have an account? <router-link to="/register">Sign Up</router-link>
      </div>
    </div>


</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '../store/auth'
import '/src/assets/concept/css/login-2.min.css'

export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, ['isLoading', 'error'])
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),
        async handleLogin() {
            const success = await this.login(this.form)
            if (success) {
                this.$router.push({ name: 'dashboard' })
            }
        }
    }
}
</script>