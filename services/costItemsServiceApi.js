import axios from 'axios'
import {baseUrl} from './serviceConstants'

const apiClient = axios.create({
    baseURL: `${baseUrl}costitems`
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
    Patch(id, payload) {
        return apiClient.patch(`/${id}`, payload)
    },
}