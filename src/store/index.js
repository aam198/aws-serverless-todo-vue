import { createStore } from 'vuex'

export default createStore({
  state: {
    toasts: []
  },
  mutations: {
    addToast(state, toast){
      state.toasts.push(toast);
    },
    clearToast(state, title) {
      // To find the toast
      const index = state.toasts.findIndex((toast) => toast.title === title);
      // Remove the toast from array
      state.toasts.splice(index, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
