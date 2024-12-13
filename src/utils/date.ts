export const validateDate = (date: string) => {
   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
   if (!dateRegex.test(date)) return false;

   const parsedDate = Date.parse(date);
   if (isNaN(parsedDate)) return false;

   const selectedDate = new Date(parsedDate);
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   return selectedDate >= today;
};

export const formatDateOut = (date: string) => {
   const [year, month, day] = date.split('-');
   return `${day}/${month}/${year}`;
};
export const formatDateIn = (date: string) => {
   const [day, month, year] = date.split('/');
   return `${year}-${month}-${day}`;
};
