import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
  //   xsrfHeaderName: "X-CSRFToken",
  //   xsrfCookieName: "csrftoken",
  //   withCredentials: true,
})

export default {
  getDataSetValues: async (datasetKey, latitude, longitude) => {
    const response = await api.get(
      `/api/core/son/datasets/${datasetKey}?latitude=${latitude}&longitude=${longitude}`
    )
    return response.data
  }
}
