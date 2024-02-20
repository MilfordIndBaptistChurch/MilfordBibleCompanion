import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDrawerStore = defineStore({
  id: 'drawer',
  state: () => ({
    open: false,
  }),
  actions: {
    setOpenState(open: bool) {
      this.open = open as bool;
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDrawerStore, import.meta.hot))
}
