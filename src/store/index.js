import Vuex from "vuex";
import Vue from "vue";
import home from "../modules/home/vuex/index";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: home.state
  },
  mutations: {
    //Loop through modules and reset each
    reset(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], null);
      });
    },
  },
  actions: {},
  modules: {
    home,
  },
  // plugins: [authState],
});
