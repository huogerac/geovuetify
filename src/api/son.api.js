import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
  //   xsrfHeaderName: "X-CSRFToken",
  //   xsrfCookieName: "csrftoken",
  //   withCredentials: true,
})

export default {
  getSonData: async (latitude, longitude) => {
    const response = await api.get(
      `/api/core/son/water?latitude=${latitude}&longitude=${longitude}`
    )
    console.log('api---------->', response.data)
    return response.data
  }
}
