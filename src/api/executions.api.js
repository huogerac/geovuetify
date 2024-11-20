import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
  //   xsrfHeaderName: "X-CSRFToken",
  //   xsrfCookieName: "csrftoken",
  //   withCredentials: true,
})

export default {
  getExecutionPoints: async (executionId) => {
    const response = await api.get(`/api/core/executions/${executionId}/points`)
    return response.data
  },
  addExecution: async (email) => {
    const formData = {
      email
    }
    const response = await api.post('/api/core/executions/add', formData)
    return response.data
  },
  uploadPoints: async (executionId, uploadedFile) => {
    let formData = new FormData()
    formData.append('file', uploadedFile)

    const response = await api.post(`/api/core/executions/${executionId}/points/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('response.data:', response.data)
    return response.data
  },
  reportProcess: async (executionId) => {
    const response = await api.post(`/api/core/executions/${executionId}/report/process`)
    console.log('response', response)
    return response.data
  }
}
