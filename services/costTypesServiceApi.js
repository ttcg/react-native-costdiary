import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://costsdiaryapi.azurewebsites.net/api/' + 'costtypes'
})

export default {
    GetAll() {
        return apiClient.get('/')
    }
}