<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-6">
              <h4>Carbon Credit Projects</h4>
            </div>

            <div class="col-sm-6">
              <router-link
                to="/carbon-projects/new"
                class="btn btn-primary btm-sm pull-right"
              >
                Create New Project
              </router-link>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Methodology</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.id">
                <td>{{ project.project_name }}</td>
                <td>{{ project.methodology_display }}</td>
                <td>
                  {{ project.status }}
                </td>
                <td>{{ project.start_date }}</td>
                <td>
                  <router-link
                    :to="`/dashboard/carbon-credit-projects/${project.id}`"
                    class="btn btn-sm btn-outline-primary"
                  >
                    View
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

          <div v-if="loading" class="text-center my-4">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import projects from '@/api/projects.js';

export default {
  name: "CarbonCreditProjects",
  data(){
    return {
      projects: [],
      loading: false,
    }
  },
  methods: {
    async getProjects(){
      try{
        let response = await projects.getProjects()
        this.projects = response.data['results']
      }catch(err){
        console.log(err)
      }
    },
  },
  mounted() {
    this.getProjects()
  }
}
</script>


<style scoped>

</style>