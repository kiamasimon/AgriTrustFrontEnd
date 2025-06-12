<template>
  <div class="layout-sidebar">
        <div class="layout-sidebar-backdrop"></div>
        <div class="layout-sidebar-body">
          <div class="custom-scrollbar">
            <nav id="sidenav" class="sidenav-collapse collapse">
              <ul class="sidenav">
                <li class="sidenav-search hidden-md hidden-lg">
                  <form class="sidenav-form" action="http://demo.madebytilde.com/">
                    <div class="form-group form-group-sm">
                      <div class="input-with-icon">
                        <input class="form-control" type="text" placeholder="Search…">
                        <span class="icon icon-search input-icon"></span>
                      </div>
                    </div>
                  </form>
                </li>
<!--                <li class="sidenav-heading">Navigation</li>-->
<!--                <li class="sidenav-item has-subnav" style="margin-top: 20px">-->
<!--                  <a href="dashboard-1.html" aria-haspopup="true">-->
<!--                    <span class="sidenav-icon icon icon-home"></span>-->
<!--                    <span class="sidenav-label">Dashboards</span>-->
<!--                  </a>-->
<!--                  <ul class="sidenav-subnav collapse">-->
<!--                    <li class="sidenav-subheading">Dashboards</li>-->
<!--                    <li><a href="dashboard-1.html">Dashboard 1</a></li>-->
<!--                    <li><a href="dashboard-2.html">Dashboard 2</a></li>-->
<!--                    <li><a href="dashboard-3.html">Dashboard 3</a></li>-->
<!--                  </ul>-->
<!--                </li>-->

                <li class="sidenav-item">
                  <router-link :to="'/dashboard/'">
                    <span class="sidenav-icon icon icon-th"></span>
                    <span class="sidenav-label">Dashboard</span>
                  </router-link>
                </li>

<!--                <li class="sidenav-item">-->
<!--                  <a href="widgets.html">-->
<!--                    <span class="badge badge-success">26</span>-->
<!--                    <span class="sidenav-icon icon icon-th"></span>-->
<!--                    <span class="sidenav-label">Widgets</span>-->
<!--                  </a>-->
<!--                </li>-->
                <li class="sidenav-item">
                  <router-link :to="'/dashboard/land/parcels'">
                    <span class="sidenav-icon icon icon-th"></span>
                    <span class="sidenav-label">Land Parcels</span>
                  </router-link>
                </li>
                <li class="sidenav-item">
                  <router-link :to="'/dashboard/register/land'">
                    <span class="sidenav-icon icon icon-th"></span>
                    <span class="sidenav-label">Register Land</span>
                  </router-link>
                </li>

              </ul>
            </nav>
          </div>
        </div>
      </div>
</template>
<script setup lang="ts">
</script>