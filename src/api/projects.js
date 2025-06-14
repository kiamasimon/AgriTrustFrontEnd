import api from './api'

const projects = {
    getProjects() {
        return api.get('/farmer/projects/')
    },
    getProject(projectId) {
        return api.get(`/farmer/projects/${projectId}/`)
    },
    fetchVerifications(projectId) {
        return api.get(`/farmer/verifications/?project=${projectId}`)
    },
    fetchIssuances(projectId) {
        return api.get(`/farmer/issuances/?project=${projectId}`)
    },
    createVerification(){

    }
}

export default projects;