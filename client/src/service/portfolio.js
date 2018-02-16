import axios from 'axios'

const config = {
      id: "5a7eb5a966413b6d0576b59b",
      baseUrl: "https://localhost:8080",
      portfolio: "http://localhost:8080/portfolio/5a7eb5a966413b6d0576b59b",
      profiles: "http://localhost:8080/service/profiles"
}

export default {
      async getPortfolio() {
            const url =`${config.portfolio}`
            const response = await axios.get(url)
            return response.data
      },

      async getCoinList() {
            const url =`${config.profiles}`
            const response = await axios.get(url)
            return response.data 
      },
      async getHoldings() {
            const url =`${config.portfolio}`
            const response = await axios.get(url)
            
            return response.data.holdings 
      },
      async addHolding(holding) {
            const url = 'http://localhost:8080/portfolio/5a7eb5a966413b6d0576b59b/holdings'
            console.log(holding)
            const add = await axios.post(url, holding)

            return add.data
      },
      async deleteHolding(holding) {
            const url = 'http://localhost:8080/portfolio/5a7eb5a966413b6d0576b59b/holdings'
            const remove = await axios.delete(url, {
                  data: holding
            })
            if(remove.data.ok) {
                  return true
            }
      },
      async updateHolding(holding) {
            const url = 'http://localhost:8080/portfolio/5a7eb5a966413b6d0576b59b/holdings'
            const update = await axios.put(url, {
                  data: holding
            })

            return true         
      }
}


