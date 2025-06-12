<template>
    <div v-if="isLoading" class="loader-overlay">
        <div class="loader-spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loader-spinner {
    text-align: center;
}
</style>