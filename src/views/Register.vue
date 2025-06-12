<template>
  <div class="signup">
      <div class="signup-body">
        <a class="signup-brand" href="index.html">
          <img class="img-responsive" src="@/assets/concept/img/logo.svg" alt="Elephant">
        </a>

        <div class="signup-form">
          <form @submit.prevent="handleRegister()" data-toggle="validator" data-groups='{"birthdate": "birth_month birth_day birth_year"}'>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>

            <div class="justify-content-center">
              <h4>Personal Information</h4>
            </div>
            <hr>

            <div class="row gutter-xs">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="first-name">First name</label>
                  <input id="first-name" class="form-control" type="text" name="first_name" spellcheck="false"
                         data-msg-required="Please enter your first name." required v-model="form.user.first_name">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="last-name">Last name</label>
                  <input id="last-name" class="form-control" type="text" name="last_name" spellcheck="false"
                         data-msg-required="Please enter your last name." v-model="form.user.last_name" required>
                </div>
              </div>
            </div>
            <div class="row gutter-xs">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input id="email" class="form-control" type="email" name="email" spellcheck="false" autocomplete="off"
                         data-msg-required="Please enter your email address." v-model="form.user.email" required>
                </div>
              </div>
            </div>
            <div class="row gutter-xs">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="form.user.password" minlength="8" data-msg-minlength="Password must be 6 characters or more." data-msg-required="Please enter your password." required>
                  <small class="help-block">6-character minimum; case sensitive.</small>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label for="password2" class="form-label">Confirm Password</label>
                  <input type="password" class="form-control" id="password2" v-model="form.user.password2" required>
                </div>
              </div>

            </div>

            <div class="justify-content-center">
              <h4>Farmer Information</h4>
            </div>
            <hr>
            <div class="row gutter-xs">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Government ID Number</label>
                  <input v-model="form.government_id_number" class="form-control" required>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label>Phone Number</label>
                  <input v-model="form.phone_number" class="form-control" required>
                </div>
              </div>
            </div>

            <div class="row gutter-xs">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>ID Document (PDF/Image)</label>
                  <input type="file" @change="handleFileUpload" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
              </div>
            </div>

            <div class="row gutter-xs">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Country</label>
                  <select v-model="form.country" class="form-control" required>
                    <option value="">Select Country</option>
                    <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
                  </select>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label>Region/State</label>
                  <input v-model="form.region" class="form-control" required>
                </div>
              </div>
            </div>

            <div class="row gutter-xs">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Physical Address</label>
                  <input type="text" v-model="form.physical_address" class="form-control" required />
                </div>
              </div>

              <div class="col-sm-6">
              </div>
            </div>

            <button class="btn btn-primary btn-block" type="submit">
              <span v-if="!isLoading">Sign Up</span>
              <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          </form>
        </div>
      </div>
      <div class="signup-footer">
        Already have an account? <router-link to="/login">Log in</router-link>
      </div>
    </div>
<!--    <div class="container">-->
<!--        <div class="row justify-content-center">-->
<!--            <div class="col-md-6 col-lg-4">-->
<!--                <div class="card mt-5">-->
<!--                    <div class="card-body">-->
<!--                        <h2 class="card-title text-center mb-4">Register</h2>-->
<!--                        <form @submit.prevent="handleRegister">-->
<!--&lt;!&ndash;                            <div v-if="error" class="alert alert-danger">&ndash;&gt;-->
<!--&lt;!&ndash;                                <div v-for="(messages, field) in error" :key="field">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <div v-for="message in messages" :key="message">{{ field }}: {{ message }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->
<!--                          <div v-if="error" class="alert alert-danger">{{ error }}</div>-->
<!--                            <div class="mb-3">-->
<!--                                <label for="username" class="form-label">Username</label>-->
<!--                                <input type="text" class="form-control" id="username" v-model="form.username" required>-->
<!--                            </div>-->
<!--                            <div class="mb-3">-->
<!--                                <label for="email" class="form-label">Email</label>-->
<!--                                <input type="email" class="form-control" id="email" v-model="form.email" required>-->
<!--                            </div>-->
<!--                            <div class="mb-3">-->
<!--                                <label for="password" class="form-label">Password</label>-->
<!--                                <input type="password" class="form-control" id="password" v-model="form.password" required>-->
<!--                            </div>-->
<!--                            <div class="mb-3">-->
<!--                                <label for="password2" class="form-label">Confirm Password</label>-->
<!--                                <input type="password" class="form-control" id="password2" v-model="form.password2" required>-->
<!--                            </div>-->
<!--                            <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">-->
<!--                                <span v-if="!isLoading">Register</span>-->
<!--                                <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>-->
<!--                            </button>-->
<!--                        </form>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '../store/auth'
import '@/assets/concept/css/signup-2.min.css'

export default {
    data() {
        return {
            form: {
              user: {
                username: '',
                email: '',
                password: '',
                first_name: '',
                last_name: ''
              },
              phone_number: '',
              government_id_number: '',
              physical_address: '',
              country: '',
              region: '',
              id_document: ''
            },
          countries: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia'],
        }
    },
    computed: {
        ...mapState(useAuthStore, ['isLoading', 'error'])
    },
    methods: {
      ...mapActions(useAuthStore, ['register']),
      handleFileUpload(event){
          this.form.id_document = event.target.files[0]
      },
      async handleRegister() {
        try{
          const formPayload = new FormData()
          // Append user data

          // formPayload.append('user', JSON.stringify(this.form.user))
          formPayload.append('email', this.form.user.email)
          formPayload.append('password', this.form.user.password)
          formPayload.append('password2', this.form.user.password2)
          formPayload.append('first_name', this.form.user.first_name)
          formPayload.append('last_name', this.form.user.last_name)

          // Append profile data
          formPayload.append('phone_number', this.form.phone_number)
          formPayload.append('government_id_number', this.form.government_id_number)
          formPayload.append('physical_address', this.form.physical_address)
          formPayload.append('country', this.form.country)
          formPayload.append('region', this.form.region)
          formPayload.append('id_document', this.form.id_document, this.form.id_document.name)

          console.log(this.form)
          const success = await this.register(formPayload)
          if (success) {
              this.$router.push({ name: 'login' })
          }
        }catch(err){
          console.error('Onboarding failed:', err)
          alert('Onboarding failed. Please check your information and try again.')
        }
      }
    }
}
</script>

<style scoped>
.row {
  margin-top: 2px !important;
}

.signup {
  margin-top: 100px;
  max-width: 80%;
}
</style>