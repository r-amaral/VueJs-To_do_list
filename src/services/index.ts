export const getUserById = async (id: string) => {
   try {
      const response = await fetch(`http://localhost:3001/users/${id}`);
      const user = await response.json();
      return user;
   } catch (error) {
      throw Error(`Error logging in: ${error}`);
   }
};
