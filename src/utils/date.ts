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

export const formatDate = (date: string) => {
   const parsedDate = new Date(Date.parse(date));
   const day = String(parsedDate.getDate()).padStart(2, '0');
   const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
   const year = parsedDate.getFullYear();
   return `${day}/${month}/${year}`;
};
