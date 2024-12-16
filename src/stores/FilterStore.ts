import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
   state() {
      return {
         category: [] as string[],
         priority: '',
      };
   },

   actions: {
      setFilter(payload: { category: string[]; priority: string }) {
         this.category = payload.category;
         this.priority = payload.priority;
      },
   },
});
