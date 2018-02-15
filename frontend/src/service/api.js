const axios = require('axios')
const config = {
      id: "5a7eb5a966413b6d0576b59b",
      baseUrl: "https://localhost:8080",
      portfolio: "http://localhost:8080/portfolio/5a7eb5a966413b6d0576b59b",
      profiles: "http://localhost:8080/service/profiles"
}

class DataService {
      static fetchPortfolio() {
                  const url =`${config.portfolio}`
                  return axios.get(url)
      }
      static fetchProfiles() {
                  const url =`${config.profiles}`
                  return axios.get(url)
      }
}

export default DataService

