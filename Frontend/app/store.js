import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    localHost: 'http://192.168.1.51:3000/',
    accounts: [],
    selectedAccount: null,
    accountTransactions: [],
    transactions: [],
    selectedTransaction: null
  }
});
