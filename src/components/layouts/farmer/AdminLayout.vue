<template>
  <div>
    <Navbar />

    <div class="layout-main">
      <Sidebar />

      <div class="layout-content">
        <div class="layout-content-body">
          <router-view />
        </div>
      </div>
    </div>

<!--    <div class="layout-footer">-->
<!--      <div class="layout-footer-body">-->
<!--        <small class="version">Version 1.4.0</small>-->
<!--        <small class="copyright">2017 &copy; Elephant <a href="http://madebytilde.com/">Made by Tilde</a></small>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>
import "/src/assets/concept/css/application.min.css";
import "/src/assets/concept/css/demo.min.css";

import "/src/assets/concept/js/application.min.js";
import "/src/assets/concept/js/demo.min.js";

import Sidebar from '@/components/layouts/farmer/SideBar.vue'
import Navbar from '@/components/layouts/farmer/NavBar.vue'

export default {
  data() {
    return {}
  },
  components: {Sidebar, Navbar}
}
</script>

<style scoped>
.layout-main{
  margin-top: 40px;
}
</style>
