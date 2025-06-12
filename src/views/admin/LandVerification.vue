<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Verify Land Parcel</h4>
      </div>

      <div class="card-body">
        <div class="alert alert-danger" v-if="result != null">
          {{ result }}
        </div>
        <div class="form-group">
          <select v-model="verificationMethod" class="form-control">
            <option value="satellite">Satellite Imagery</option>
            <option value="gps">GPS Measurement</option>
            <option value="survey">Professional Survey</option>
          </select>
        </div>

        <div v-if="verificationMethod === 'gps'">
          <button @click="startGPSTracking" class="btn btn-primary btm-sm">Start GPS Tracking</button>
          <div v-for="(point, index) in gpsPoints" :key="index">
            {{ point.lat }}, {{ point.lng }}
          </div>
        </div>

        <div v-if="verificationMethod === 'survey'">
          <div class="form-group">
            <input type="file" class="form-control" @change="handleSurveyUpload">
          </div>
        </div>

      </div>
    </div>

    <button @click="submitVerification" class="btn btn-success btn-sm pull-right">Submit Verification</button>
  </div>
</template>

<script>
import farmer from '@/api/farmer.js'
export default {
  name: "LandVerification",
  data(){
    return {
      verificationMethod: 'satellite',
      gpsPoints: [],
      surveyFile: null,
      result: null
    }
  },
  methods: {
    handleSurveyUpload(event){
      this.surveyFile = event.target.files[0]
    },
    startGPSTracking(){
      navigator.geolocation.watchPosition(
        position => {
          this.gpsPoints.push({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        error => console.error(error),
        { enableHighAccuracy: true }
      )
    },
    async submitVerification(){
      try {
        let formData = new FormData()
        formData.append('land_parcel', this.$route.params.id)
        formData.append('verification_method', this.verificationMethod)

        if (this.verificationMethod === 'gps') {
          formData.append('gps_points', JSON.stringify(this.gpsPoints))
        } else if (this.verificationMethod === 'survey' && this.surveyFile) {
          formData.append('survey_report', this.surveyFile, this.surveyFile.name)
        }
        console.log(formData)
        let response = await farmer.verifyLand(formData)
        this.result = response.data
        if(this.result['status'] === 'completed'){
          this.$router.push('/dashboard/land/parcels')
        }
      } catch (error) {
        console.error('Verification failed:', error)
      }
    }
  },
  mounted() {

  }
}
</script>