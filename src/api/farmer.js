import api from './api'

const farmer = {
    registerLand(content) {
        return api.post('/farmer/land/', content)
    },
    listLandParcels(){
        return api.get('/farmer/land/')
    },
    verifyLand(content){
        return api.post('/farmer/land/verification/', content)
    },
    tokenizeLand(content){
        return api.post('/farmer/land/tokenize/', content)
    },
}

export default farmer;