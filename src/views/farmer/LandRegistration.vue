<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3>Register Your Land Parcel</h3>
        </div>

        <div class="card-body">
          <form @submit.prevent="submitLand">
            <div class="row">
              <div class="col-sm-6">
                <h3>Land Details</h3>
                <div class="form-group">
                  <label>Title Deed Number</label>
                  <input class="form-control" v-model="land.title_deed_number" placeholder="e.g. LR 12345">
                </div>

                <div class="form-group">
                  <label>Upload Title Deed (Optional)</label>
                  <input class="form-control" type="file" @change="handleDeedUpload">
                </div>

                <div class="form-group">
                  <label>Total Area (Hectares)</label>
                  <input class="form-control" v-model.number="land.total_area" type="number" step="0.01" min="0.01">
                </div>

              </div>

              <div class="col-sm-6">
                <h3>Location Details</h3>
                <div class="form-group">
                  <label>Physical Address</label>
                  <input class="form-control" v-model="land.address" placeholder="Full physical address">
                </div>

                <div class="form-group">
                  <label>Country</label>
                  <select class="form-control" v-model="land.country">
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Region/County</label>
                  <input class="form-control" v-model="land.region" placeholder="e.g. Nairobi County">
                </div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-sm-12">
                <h3>Map Your Land Boundaries</h3>
                  <p>Click on the map to add boundary points (minimum 3 points required)</p>

                <div class="form-section">
                  <div class="map-container">
                    <div id="map"></div>
                    <div class="coordinates-list">
                      <div v-for="(coord, index) in land.coordinates" :key="index" class="coord-item">
                        Point {{ index + 1 }}: {{ coord[0].toFixed(6) }}, {{ coord[1].toFixed(6) }}
                        <button @click="removeCoordinate(index)" class="remove-btn">×</button>
                      </div>
                    </div>
                  </div>

                  <div v-if="land.coordinates.length > 0" class="area-display">
                    Estimated Area: {{ calculateArea().toFixed(2) }} hectares
                  </div>
                </div>

                <br>
                <div class="form-group">
                  <button type="button" @click="resetForm" class="btn btn-warning">Reset</button>
                  <button type="submit" :disabled="!isFormValid" class="btn btn-primary pull-right">
                    {{ isLoading ? 'Registering...' : 'Register Land' }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="land-registration">
    <h2></h2>

    <form @submit.prevent="submitLand" class="land-form">

      <!-- Land Boundaries Mapping -->
<!--      <div class="form-section">-->
<!--        <h3>Map Your Land Boundaries</h3>-->
<!--        <p>Click on the map to add boundary points (minimum 3 points required)</p>-->

<!--        <div class="map-container">-->
<!--          <div id="map"></div>-->
<!--          <div class="coordinates-list">-->
<!--            <div v-for="(coord, index) in land.coordinates" :key="index" class="coord-item">-->
<!--              Point {{ index + 1 }}: {{ coord[0].toFixed(6) }}, {{ coord[1].toFixed(6) }}-->
<!--              <button @click="removeCoordinate(index)" class="remove-btn">×</button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div v-if="land.coordinates.length > 0" class="area-display">-->
<!--          Estimated Area: {{ calculateArea().toFixed(2) }} hectares-->
<!--        </div>-->
<!--      </div>-->

      <!-- Form Actions -->

    </form>
  </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useAuthStore } from '@/store/auth'
import farmer from '@/api/farmer.js';

export default {
  setup() {
    const authStore = useAuthStore()
    const isLoading = ref(false)
    const map = ref(null)
    const polygonLayer = ref(null)

    const land = ref({
      title_deed_number: '',
      title_deed_document: null,
      total_area: 0,
      coordinates: [],
      address: '',
      country: 'Kenya',
      region: '',
      verification_status: 'unverified'
    })

    const isFormValid = computed(() => {
      return (
        land.value.title_deed_number &&
        land.value.total_area > 0 &&
        land.value.coordinates.length >= 3 &&
        land.value.address &&
        land.value.country &&
        land.value.region
      )
    })

    const initMap = () => {
      // Initialize map centered on Kenya
      map.value = L.map('map').setView([-1.2921, 36.8219], 10)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value)

      // Handle map clicks
      map.value.on('click', (e) => {
        land.value.coordinates.push([e.latlng.lng, e.latlng.lat])
        updateMapPolygon()
      })
    }

    const updateMapPolygon = () => {
      // Clear existing polygon
      if (polygonLayer.value) {
        map.value.removeLayer(polygonLayer.value)
      }

      // Draw new polygon if we have enough points
      if (land.value.coordinates.length >= 3) {
        polygonLayer.value = L.polygon(land.value.coordinates, { color: 'blue' }).addTo(map.value)
        map.value.fitBounds(polygonLayer.value.getBounds())
      }
    }

    const removeCoordinate = (index) => {
      land.value.coordinates.splice(index, 1)
      updateMapPolygon()
    }

    const calculateArea = () => {
      if (land.value.coordinates.length < 3) return 0

      // Simple area calculation (for display only)
      let area = 0
      const n = land.value.coordinates.length

      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n
        const xi = land.value.coordinates[i][0]
        const yi = land.value.coordinates[i][1]
        const xj = land.value.coordinates[j][0]
        const yj = land.value.coordinates[j][1]

        area += xi * yj - xj * yi
      }

      return Math.abs(area / 2) * 111319.9 * 111319.9 / 10000 // Convert to hectares
    }

    const handleDeedUpload = (event) => {
      land.value.title_deed_document = event.target.files[0]
    }

    const resetForm = () => {
      land.value = {
        title_deed_number: '',
        title_deed_document: null,
        total_area: 0,
        coordinates: [],
        address: '',
        country: 'Kenya',
        region: '',
        verification_status: 'unverified'
      }

      if (polygonLayer.value) {
        map.value.removeLayer(polygonLayer.value)
        polygonLayer.value = null
      }
    }

    const submitLand = async () => {
      if (!isFormValid.value) return

      isLoading.value = true

      try {
        const formData = new FormData()

        // Add all land data
        formData.append('title_deed_number', land.value.title_deed_number)
        formData.append('total_area', land.value.total_area)
        formData.append('gps_coordinates', JSON.stringify(land.value.coordinates))
        formData.append('address', land.value.address)
        formData.append('country', land.value.country)
        formData.append('region', land.value.region)

        if (land.value.title_deed_document) {
          formData.append('title_deed_document', land.value.title_deed_document)
        }

        const response = await farmer.registerLand(formData)

        // Show success and redirect
        alert('Land registered successfully! Verification pending.')
        resetForm()

      } catch (error) {
        console.error('Land registration failed:', error)
        alert('Registration failed. Please check your inputs and try again.')
      } finally {
        isLoading.value = false
      }
    }

    return {
      land,
      isLoading,
      isFormValid,
      submitLand,
      initMap,
      removeCoordinate,
      calculateArea,
      handleDeedUpload,
      resetForm
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style scoped>
.land-registration {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.land-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
}


.map-container {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

#map {
  height: 400px;
  width: 70%;
  border-radius: 8px;
}

.coordinates-list {
  width: 30%;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}

.coord-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.area-display {
  margin-top: 10px;
  font-weight: bold;
  color: #2a6496;
}

</style>