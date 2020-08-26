import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://costsdiaryapi.azurewebsites.net/api/costitems'
})

export default {
    GetAll() {
        return apiClient.get('/')
    },
    Reset() {
        return apiClient.post('/reset')
    },
    Filter(payload) {
        return apiClient.get('/filter', payload)
    },
    Delete(id) {
        return apiClient.delete(`/${id}`)
    },
    Add(payload) {
        return apiClient.post('/', payload)
    },
}