import { defineStore, acceptHMRUpdate } from 'pinia'

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    selectedChapter: 0 as number,
    selectedVerse: 0 as number
  }),
  actions: {
    setSelectedChapter(chapter: number) {
      this.selectedChapter = chapter as number;
    },

    setSelectedVerse(verse: number) {
      this.selectedVerse = verse as number;
    },

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookStore, import.meta.hot))
}
