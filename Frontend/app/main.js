import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store';
import VueDevtools from 'nativescript-vue-devtools'
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);
Vue.use(VueDevtools);

new Vue({
  render: h => h('frame', [h(App)]),
  store
}).$start()
