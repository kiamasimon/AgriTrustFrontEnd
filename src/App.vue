<template>
    <AppLoader :isLoading="isLoading" />
    <div>
        <router-view />
    </div>
</template>

<script>
import AppLoader from './components/AppLoader.vue'
import { mapState } from 'pinia'
import { useAuthStore } from './store/auth'

export default {
    components: {
        AppLoader
    },
    computed: {
        ...mapState(useAuthStore, ['isLoading'])
    }
}
</script>

<style>
.page-loaded {
    background: #f2f5f8;
}
.app {
  min-height: 100vh;
}
/* Add any global styles here */
</style>