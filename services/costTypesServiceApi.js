import axios from 'axios'
import {baseUrl} from './serviceConstants'

const apiClient = axios.create({
    baseURL: `${baseUrl}costtypes`
})

export default {
    GetAll() {
        return apiClient.get('/')
    }
}