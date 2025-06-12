<template>
    <div class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">
            <img class="navbar-brand-logo" src="@/assets/concept/img/logo.svg" alt="Elephant">
          </a>
        </div>
        <nav id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="landing-page.html#">Home</a></li>
            <li><a href="landing-page.html#">Features</a></li>
            <li><a href="landing-page.html#">Faq</a></li>
            <li><a href="landing-page.html#">Team</a></li>
            <li><a href="landing-page.html#">Testimonials</a></li>
            <li><router-link to="/login">Login</router-link></li>
            <li>
              <div class="navbar-btn-group">
                <router-link class="navbar-btn btn btn-primary btn-block" to="register">Sign up</router-link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
<!--  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">-->
<!--        <div class="container">-->
<!--            <router-link class="navbar-brand" to="/">My App</router-link>-->
<!--            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">-->
<!--                <span class="navbar-toggler-icon"></span>-->
<!--            </button>-->
<!--            <div class="collapse navbar-collapse" id="navbarNav">-->
<!--                <ul class="navbar-nav me-auto">-->
<!--                    <li class="nav-item">-->
<!--                        <router-link class="nav-link" to="/">Home</router-link>-->
<!--                    </li>-->
<!--                    <li v-if="isAuthenticated" class="nav-item">-->
<!--                        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>-->
<!--                    </li>-->
<!--                </ul>-->
<!--                <ul class="navbar-nav">-->
<!--                    <li v-if="!isAuthenticated" class="nav-item">-->
<!--                        <router-link class="nav-link" to="/login">Login</router-link>-->
<!--                    </li>-->
<!--                    <li v-if="!isAuthenticated" class="nav-item">-->
<!--                        <router-link class="nav-link" to="/register">Register</router-link>-->
<!--                    </li>-->
<!--                    <li v-if="isAuthenticated" class="nav-item dropdown">-->
<!--                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">-->
<!--                            {{ currentUser.username }}-->
<!--                        </a>-->
<!--                        <ul class="dropdown-menu">-->
<!--                            <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>-->
<!--                        </ul>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
<!--    </nav>-->
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../store/auth'

export default {
    computed: {
        ...mapState(useAuthStore, ['isAuthenticated', 'currentUser'])
    },
    methods: {
        ...mapActions(useAuthStore, ['logout'])
    }
}
</script>