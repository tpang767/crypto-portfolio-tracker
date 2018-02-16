import Vue from "Vue"
import Vuex from "Vuex"
import portfolio from "../service/portfolio"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"


export default new Vuex.Store({
	state: {
		portfolio: {
			holdings: []
		}
	},
	getters: {
		allHoldings: state => {
			console.log(state.portfolio.holdings)
			return state.portfolio.holdings
		}
	},
	actions: {
		async getAllHoldings({ commit }) {
			const holdings = await portfolio.getHoldings()
			commit("setHoldings", holdings)
		}
	},
	mutations: {
		setHoldings(state, holdings) {
			state.all = holdings
		}
	}
})
