export const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
export const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
   return item.trim();
 });
export const imageMaxSize = 10000000; // bytes
export const limitDesc = 80;

export function firstChartByFullName (fullName : any){ 
  var str = fullName
  str = str.split(" "); 
  str = str.filter((res : any  ) => res.length > 0 ); 
  str = str.map(function(res : any){ 
    return res[0].toUpperCase(); 
  }); 
  str = str.join(""); 
  return str; 
};