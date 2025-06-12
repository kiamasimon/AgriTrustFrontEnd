<template>
    <div>
      <div class="title-bar">
        <h1 class="title-bar-title">
<!--          <span class="d-ib">Dashboard</span>-->
          <span class="d-ib">
<!--            <a class="title-bar-shortcut" href="labels.html#" title="Add to shortcut list" data-container="body" data-toggle-text="Remove from shortcut list" data-trigger="hover" data-placement="right" data-toggle="tooltip">-->
<!--              <span class="sr-only">Add to shortcut list</span>-->
<!--            </a>-->
          </span>
        </h1>
        <p class="title-bar-description">
<!--          <small>The label component that is part of Bootstrap is expanded with several variants and some additional classes.</small>-->
        </p>
      </div>

      <div class="row gutter-xs">
            <div class="col-md-6 col-lg-3 col-lg-push-0">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <div class="media-middle media-left">
                      <span class="bg-primary circle sq-48">
                        <span class="icon icon-user"></span>
                      </span>
                    </div>
                    <div class="media-middle media-body">
                      <h6 class="media-heading">Balance</h6>
                      <h3 class="media-heading">
                        <span class="fw-l">{{ balance }} HBars</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 col-lg-push-3">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <div class="media-middle media-left">
                      <span class="bg-danger circle sq-48">
                        <span class="icon icon-shopping-bag"></span>
                      </span>
                    </div>
                    <div class="media-middle media-body">
                      <h6 class="media-heading">Orders</h6>
                      <h3 class="media-heading">
                        <span class="fw-l">1,256 Items</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 col-lg-pull-3">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <div class="media-middle media-left">
                      <span class="bg-primary circle sq-48">
                        <span class="icon icon-clock-o"></span>
                      </span>
                    </div>
                    <div class="media-middle media-body">
                      <h6 class="media-heading">Account ID</h6>
                      <h3 class="media-heading">
                        <span class="fw-l">{{ hederaAccountId }}</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 col-lg-pull-0">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <div class="media-middle media-left">
                      <span class="bg-danger circle sq-48">
                        <span class="icon icon-usd"></span>
                      </span>
                    </div>
                    <div class="media-middle media-body">
                      <h6 class="media-heading">Total Sales</h6>
                      <h3 class="media-heading">
                        <span class="fw-l">$155,352.47</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Welcome, {{ user.username }}!</h2>
<!--                <p class="card-text">Email: {{ user.email }}</p>-->
<!--                <p class="card-text">Full Name: {{ user.first_name }} {{ user.last_name }}</p>-->

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useAuthStore } from '../store/auth'

export default {
    computed: {
        ...mapState(useAuthStore, ['user', 'balance', 'hederaAccountId', 'did'])
    }
}
</script>