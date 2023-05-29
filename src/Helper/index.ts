
import moment from "moment";

interface latlngPoint {
  lat : number ,
  lng : number
}

export function getFormatedDate(date : string) {
    if(!date){
     return 'NA'
    }
     let formatedDateTime = moment(date).format('MMMM Do YYYY, hh:mm A');
     return formatedDateTime;
}

export function getDateWithDay(date : string) {
  if(!date){
   return 'NA'
  }
   let formatedDateTime = moment(date).format('ddd, DD MMMM YYYY hh:mm A');
   return formatedDateTime;
}

export function setFormatDate(date : string) {
  if(!date){
   return 'NA'
  }
   let formatedDateTime = moment(date).format('DD/MM/YYYY');
   return formatedDateTime;
}

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



function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function calculateDistance(origin :latlngPoint, destination : latlngPoint) {
  const radius = 6371; // Radius of the earth in km
  const distanceLat = deg2rad(destination.lat - origin.lat); // deg2rad below
  const distanceLng = deg2rad(destination.lng - origin.lng);
  const a =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos(deg2rad(origin.lat)) *
    Math.cos(deg2rad(destination.lat)) *
    Math.sin(distanceLng / 2) *
    Math.sin(distanceLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = (radius * c).toFixed(2); // Distance in km
  return parseInt(distance) ;
}

export const CapitalizeFirstLetter = (data : any) => {
  if(data) {
    const str = data.charAt(0).toUpperCase() + data.slice(1);
    return str
  }
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}







// function getDistanceByRoad(origin, destination, api_key) {
//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api_key}`;

//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       if (data.rows.length > 0 && data.rows[0].elements.length > 0) {
//         const distance = data.rows[0].elements[0].distance.text;
//         return distance;
//       } else {
//         throw new Error('No distance found');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       return null;
//     });
// }