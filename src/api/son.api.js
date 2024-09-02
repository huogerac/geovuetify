import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
  //   xsrfHeaderName: "X-CSRFToken",
  //   xsrfCookieName: "csrftoken",
  //   withCredentials: true,
})

export default {
  getDataSetValues: async (datasetKey, latitude, longitude, distance) => {
    const response = await api.get(
      `/api/core/datasets/${datasetKey}?latitude=${latitude}&longitude=${longitude}&distance_m=${distance}`
    )
    return response.data
  },
  uploadPoints: async (filePoints) => {
    let formData = new FormData()
    formData.append('file', filePoints)
    const response = await api.post(`/api/core/upload/points`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('response.data:', response.data)
    return response.data
  }
}
