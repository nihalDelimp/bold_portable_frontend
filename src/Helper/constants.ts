export const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
export const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
   return item.trim();
 });

export const originAddress = '1640 Leckie Rd, Kelowna, BC V1X 7C6, Canada'
export const originPoint = {lat : 49.8837165 , lng : -119.4312619}
export const imageMaxSize = 10000000; // bytes
export const limitDesc = 100;

export const usePickTimes = ['12am-3am' ,'3am-6am' , '6am-9am' , '9am-12pm' , '12pm-3pm' ,'3pm-6pm' ,'6pm-9pm' ,'9pm-12am']