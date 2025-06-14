<template>
  <div class="issuance-list">
    <div>
      <div v-if="issuances.length === 0" class="alert alert-info">
        No carbon credit issuances yet for this project.
      </div>

      <div class="row">
        <div class="col-sm-12">
          <button
            v-if="canIssueCredits"
            class="btn btn-sm btn-primary btn-sm pull-right"
            @click="showIssueForm = true"
          >
            Request New Issuance
          </button>
        </div>
      </div>

      <br/>

      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Issuance Date</th>
              <th>Amount (tCO₂e)</th>
              <th>Status</th>
              <th>Batch Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="issuance in issuances" :key="issuance.id">
              <td>{{ formatDate(issuance.issuance_date) }}</td>
              <td>{{ issuance.amount }}</td>
              <td>
                <span :class="`badge bg-${getStatusClass(issuance.status)}`">
                  {{ issuance.status_display }}
                </span>
              </td>
              <td>{{ issuance.batch_number }}</td>
              <td>
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="viewDetails(issuance)"
                >
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-3">
        <div class="text-muted">
          Showing {{ issuances.length }} issuances
        </div>
      </div>
    </div>

    <!-- Issuance Details Modal -->
    <div v-if="selectedIssuance" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Issuance Details - Batch {{ selectedIssuance.batch_number }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="selectedIssuance = null"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <p><strong>Issuance Date:</strong> {{ formatDate(selectedIssuance.issuance_date) }}</p>
                <p><strong>Amount:</strong> {{ selectedIssuance.amount }} tCO₂e</p>
                <p><strong>Status:</strong>
                  <span :class="`badge bg-${getStatusClass(selectedIssuance.status)}`">
                    {{ selectedIssuance.status_display }}
                  </span>
                </p>
                <p><strong>Verification Body:</strong> {{ selectedIssuance.verification_body }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Verification Date:</strong> {{ formatDate(selectedIssuance.verification_date) }}</p>
                <p><strong>Token ID:</strong>
                  <span v-if="selectedIssuance.token_id" class="font-monospace">
                    {{ selectedIssuance.token_id }}
                  </span>
                  <span v-else class="text-muted">Not assigned yet</span>
                </p>
                <p><strong>Transaction ID:</strong>
                  <span v-if="selectedIssuance.transaction_id" class="font-monospace">
                    {{ selectedIssuance.transaction_id }}
                  </span>
                  <span v-else class="text-muted">Not recorded yet</span>
                </p>
                <p><strong>Retired:</strong>
                  {{ selectedIssuance.is_retired ? 'Yes' : 'No' }}
                  <span v-if="selectedIssuance.is_retired">
                    ({{ formatDate(selectedIssuance.retired_date) }})
                  </span>
                </p>
              </div>
            </div>

            <div class="mt-4">
              <h6>Verification Report</h6>
              <a
                v-if="selectedIssuance.verification_report"
                :href="selectedIssuance.verification_report"
                target="_blank"
                class="btn btn-sm btn-outline-secondary"
              >
                <i class="bi bi-file-earmark-pdf"></i> View Report
              </a>
              <span v-else class="text-muted">No report available</span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="selectedIssuance = null"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" @click="selectedIssuance = null"></div>
    </div>

    <!-- New Issuance Form Modal -->
    <div v-if="showIssueForm" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Request Carbon Credit Issuance</h5>
            <button
              type="button"
              class="btn-close"
              @click="showIssueForm = false"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitIssuanceRequest">
              <div class="mb-3">
                <label class="form-label">Requested Amount (tCO₂e)</label>
                <input
                  v-model="issuanceForm.amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  class="form-control"
                  required
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Verification Report</label>
                <input
                  type="file"
                  ref="verificationReport"
                  class="form-control"
                  accept=".pdf,.doc,.docx"
                  required
                >
                <small class="text-muted">Upload the verification report document</small>
              </div>

              <div class="mb-3">
                <label class="form-label">Verification Body</label>
                <input
                  v-model="issuanceForm.verification_body"
                  type="text"
                  class="form-control"
                  required
                >
              </div>

              <div class="mb-3">
                <label class="form-label">Verification Date</label>
                <input
                  v-model="issuanceForm.verification_date"
                  type="date"
                  class="form-control"
                  required
                >
              </div>

              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-outline-secondary me-2"
                  @click="showIssueForm = false"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="issuanceLoading"
                >
                  <span
                    v-if="issuanceLoading"
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" @click="showIssueForm = false"></div>
    </div>
  </div>
</template>

<script>
import projects from "@/api/projects.js";

export default {
  props: {
    projectId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      selectedIssuance: null,
      showIssueForm: false,
      issuanceLoading: false,
      issuanceForm: {
        amount: '',
        verification_body: '',
        verification_date: new Date().toISOString().split('T')[0],
      },
      canIssueCredits: true,
      issuances: [],
    }
  },
  computed: {

  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    getStatusClass(status) {
      switch (status) {
        case 'issued': return 'success'
        case 'pending': return 'warning'
        case 'retired': return 'info'
        case 'rejected': return 'danger'
        default: return 'secondary'
      }
    },
    viewDetails(issuance) {
      this.selectedIssuance = issuance
    },
    async fetchIssuances(){
      try{
        let response = await projects.fetchIssuances(this.$route.params.id)
        this.issuances = response.data["results"]
      }catch(err){
        console.log(err)
      }
    },
    async submitIssuanceRequest() {
      this.issuanceLoading = true
      try {
        const formData = new FormData()
        formData.append('project', this.projectId)
        formData.append('amount', this.issuanceForm.amount)
        formData.append('verification_body', this.issuanceForm.verification_body)
        formData.append('verification_date', this.issuanceForm.verification_date)

        const reportFile = this.$refs.verificationReport.files[0]
        if (reportFile) {
          formData.append('verification_report', reportFile)
        }

        await projects.createIssuance(formData)
        this.$emit('refresh')
        this.showIssueForm = false
        this.resetForm()
      } catch (error) {
        console.error('Error submitting issuance request:', error)
        alert('Failed to submit issuance request. Please try again.')
      } finally {
        this.issuanceLoading = false
      }
    },
    resetForm() {
      this.issuanceForm = {
        amount: '',
        verification_body: '',
        verification_date: new Date().toISOString().split('T')[0],
      }
      if (this.$refs.verificationReport) {
        this.$refs.verificationReport.value = ''
      }
    }
  },
  mounted() {
    this.fetchIssuances()
  }
}
</script>

<style scoped>
.issuance-list {
  position: relative;
}

.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.font-monospace {
  font-family: monospace;
  font-size: 0.9em;
  word-break: break-all;
}

.badge {
  font-size: 0.85em;
  padding: 0.35em 0.65em;
}

.bg-success {
  background-color: #28a745 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
  color: #212529;
}

.bg-info {
  background-color: #17a2b8 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}
</style>