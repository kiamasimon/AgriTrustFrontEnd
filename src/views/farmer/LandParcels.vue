<template>

  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-6">
              <h4>Land Parcels</h4>
            </div>

            <div class="col-sm-6">
              <router-link to="/dashboard/register/land" class="btn btn-primary pull-right">Register Land Parcel</router-link>
            </div>
          </div>
        </div>

        <div class="card-body">

          <!-- Filter Dropdown -->
          <div class="form-group">
            <label class="block mb-1 font-medium">Filter by Verification Status:</label>
            <select v-model="statusFilter" class="form-control">
              <option value="">All</option>
              <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>

          <!-- Data Table -->
          <vue-good-table
            :columns="columns"
            :rows="filteredRows"
            :pagination-options="paginationOptions"
            :total-rows="totalRows"
            :search-options="{ enabled: true }"
            :request-options="{ enabled: true }"
            @on-page-change="onPageChange"
          >
            <template #table-row="props">
              <span v-if="props.column.field === 'verification_date'">
                {{ formatDate(props.row.verification_date) }}
              </span>
              <span v-else-if="props.column.field === 'actions'">
                <router-link :to="'/dashboard/land/verification/'+props.row.id" class="btn btn-primary btn-sm"
                  v-if="props.row.verification_status === 'unverified'">
                  Start Land Verification
                </router-link>

                <button @click="tokenizeLand(props.row)" class="btn btn-primary btn-sm" style="margin-left: 2px"
                        v-if="props.row.verification_status === 'verified'">
                  Tokenize Land
                </button>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import farmer from "@/api/farmer.js";

export default {
  name: 'LandParcelsTable',
  data(){
    return {
      rows: [],
      currentPage: 1,
      totalRows: 0,
      statusFilter: '',
      paginationOptions: {
        enabled: true,
        mode: 'remote',
        perPage: 10
      },
      columns: [
        { label: 'Title Deed #', field: 'title_deed_number' },
        { label: 'Area (ha)', field: 'total_area', type: 'number' },
        { label: 'Country', field: 'country' },
        { label: 'Region', field: 'region' },
        { label: 'Status', field: 'verification_status' },
        { label: 'Verified On', field: 'verification_date' },
        { label: 'Actions', field: 'actions'}
      ],
      statusOptions: [
        { value: 'unverified', text: 'Unverified' },
        { value: 'pending', text: 'Pending Verification' },
        { value: 'verified', text: 'Verified' },
        { value: 'rejected', text: 'Rejected' }
      ]
    }
  },
  components: {
    VueGoodTable
  },
  computed:{
    filteredRows() {
      if (!this.statusFilter) return this.rows;
      return this.rows.filter(
        row => row.verification_status === this.statusFilter
      );
    }
  },
  methods: {
    formatDate(dateStr){
      if (!dateStr) return 'N/A'
      const date = new Date(dateStr)
      return date.toLocaleDateString()
    },
    async fetchParcels(){
      try {
        const response = await farmer.listLandParcels(this.currentPage)
        const data = response.data['results']
        this.totalRows = response.data['count']
        this.rows = data
      } catch (error) {
        console.error('Failed to fetch land parcels:', error)
      }
    },
    onPageChange(params){
      this.currentPage = params.currentPage
      this.fetchParcels()
    },
    async tokenizeLand(row){
      try{
        let payload = {
          "land_parcel": row.id
        }

        let response = await farmer.tokenizeLand(payload)
      }catch(error){
        console.error('Failed to fetch land parcels:', error)
      }
    }
  },
  mounted() {
    this.fetchParcels()
  },
}
</script>
