<template>
  <div class="row">
    <div class="col-sm-12">

      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Verification</h5>
        <button type="button" class="btn-close" @click="close"></button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label class="form-label">Verification Type</label>
            <select v-model="form.verification_type" class="form-control" required>
              <option value="">Select type</option>
              <option value="field_visit">Field Visit</option>
              <option value="remote">Remote Sensing</option>
              <option value="farmer_report">Farmer Report</option>
              <option value="community">Community Verification</option>
              <option value="drone">Drone Survey</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Verification Date</label>
            <input
              v-model="form.verification_date"
              type="date"
              class="form-control"
              required
            >
          </div>

          <div class="form-group">
            <label class="form-label">Findings</label>
            <textarea
              v-model="form.findings"
              class="form-control"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Compliant with methodology?</label>
            <div class="form-check">
              <input
                v-model="form.is_compliant"
                class="form-check-input"
                type="radio"
                :value="true"
                id="compliant-yes"
              >
              <label class="form-check-label" for="compliant-yes">Yes</label>
            </div>

            <div class="form-check">
              <input
                v-model="form.is_compliant"
                class="form-check-input"
                type="radio"
                :value="false"
                id="compliant-no"
              >
              <label class="form-check-label" for="compliant-no">No</label>
            </div>
          </div>

          <div v-if="form.is_compliant" class="mb-3">
            <label class="form-label">Compliance Score (0-100)</label>
            <input
              v-model="form.compliance_score"
              type="number"
              min="0"
              max="100"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Evidence</label>
            <FileUpload
              ref="fileUpload"
              :multiple="true"
              accept="image/*,video/*,.pdf,.doc,.docx"
              @files-selected="handleFilesSelected"
            />
            <small class="text-muted">Upload photos, videos, or documents as evidence</small>
          </div>

          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-secondary me-2" @click="close">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
              Submit Verification
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerificationForm",
  props: {
    projectId: {
      type: [String, Number],
      required: true
    }
  },
  data(){
    return{
      form: {
        verification_type: 'field_visit',
        verification_date: new Date().toISOString().split('T')[0],
        findings: '',
        is_compliant: true,
        compliance_score: 100,
        evidence_files: []
      },
      loading: false
    }
  },
  methods: {
    async submitForm(){
      // Add verification data
        const formData = new FormData()
        formData.append('project', this.projectId)
        formData.append('verification_type', this.form.verification_type)
        formData.append('verification_date', this.form.verification_date)
        formData.append('findings', this.form.findings)
        formData.append('is_compliant', this.form.is_compliant)
        if (this.form.compliance_score) {
          formData.append('compliance_score', this.form.compliance_score)
        }

        // Add evidence files
        this.form.evidence_files.forEach(file => {
          formData.append('evidence_files', file)
        })

        await this.createVerification(formData)
    }
  }
}
</script>

<style scoped>

</style>