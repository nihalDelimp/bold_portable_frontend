export const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
export const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
   return item.trim();
 });
export const imageMaxSize = 10000000; // bytes