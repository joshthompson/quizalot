const dev = process && process.env && process.env.VUE_APP_DEV ? true : false
const api = dev ? 'http://localhost:3000' : null

export default api
