import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accounts: [],
    accountTransactions: [],
    transactions: [],
    lastEmailUsed: null
  }
});
