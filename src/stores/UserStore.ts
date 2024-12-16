import { defineStore } from 'pinia';
import { UserTypes } from '../types';

export const useUserStore = defineStore('user', {
   state() {
      return {
         user: {
            email: '',
            fullName: '',
            id: '',
            password: '',
            tasks: [],
         } as UserTypes,
      };
   },

   actions: {
      setUser(userData: UserTypes) {
         this.user = userData;
      },
   },
});
