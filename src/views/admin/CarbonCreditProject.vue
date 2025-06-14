<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <h4>{{ project.project_name }}</h4>
        </div>

        <div class="card-body">
          <p><strong>Methodology:</strong> {{ project.methodology_display }}</p>
          <p><strong>Verification Standard:</strong> {{ project.verification_standard }}</p>
          <p><strong>Start Date:</strong> {{ formatDate(project.start_date) }}</p>
          <p><strong>Expected Credits:</strong> {{ project.expected_credits_per_year }} tCO2e/year</p>

          <div class="mt-3">
            <h6>Project Description</h6>
            <p class="text-muted">{{ project.project_description }}</p>
          </div>

          <section>
            <div class="row">
              <div class="col-sm-12">
                <div class="card mb-4">
                  <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Verifications</h5>
                    <button
                      v-if="canAddVerification"
                      @click="showVerificationForm = true"
                      class="btn btn-sm btn-primary btn-sm pull-right"
                    >
                      Add Verification
                    </button>
                  </div>
                  <div class="card-body">
                    <VerificationList
                      :verifications="verifications"
                      :project-id="project.id"
                      @refresh="fetchProject"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="row">
              <div class="col-sm-12">
                <div class="">
                  <div class="card mb-4">
                    <div class="card-header">
                      <h5 class="card-title mb-0">Carbon Credits</h5>
                    </div>
                    <div class="card-body">
                      <IssuanceList :project-id="$route.params.id"/>
                    </div>
                  </div>

                  <div class="card mb-4">
                    <div class="card-header">
                      <h5 class="card-title mb-0">Sensor Data</h5>
                    </div>
                    <div class="card-body">
                      <SensorDataChart :project-id="project.id" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="row">
              <div class="col-sm-12">
<!--                {{ /* List Verifications Here */ }}-->
                <VerificationForm
                  v-if="showVerificationForm"
                  :project-id="project.id"
                  @close="showVerificationForm = false"
                  @saved="handleVerificationSaved"
                />

              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerificationList from '@/components/carbon/VerificationList.vue'
import IssuanceList from '@/components/carbon/IssuanceList.vue'
import SensorDataChart from '@/components/carbon/SensorDataChart.vue'
import VerificationForm from '@/components/carbon/VerificationForm.vue'
import projects from "@/api/projects.js";

export default {
  name: "CarbonCreditProject",
  components: {
    VerificationList,
    IssuanceList,
    SensorDataChart,
    VerificationForm
  },
  data(){
    return {
      project: {},
      showVerificationForm: false,
      canAddVerification: true,
      verifications: [],
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    handleVerificationSaved() {
      this.showVerificationForm = false
      this.fetchProject()
      this.fetchVerifications(this.project.id)
    },
    async fetchProject(){
      try{
        let response = await projects.getProject(this.$route.params.id)
        this.project = response.data
      }catch(err){
        console.log(err)
      }
    },
    async fetchVerifications(){
      try{
        let response = await projects.fetchVerifications(this.$route.params.id)
        this.verifications = response.data["results"]
      }catch(err){
        console.log(err)
      }
    },
  },
  mounted() {
    this.fetchProject()
    this.fetchVerifications()
  }
}
</script>