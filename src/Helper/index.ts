
import moment from "moment";

interface latlngPoint {
  lat : number ,
  lng : number
}

export function getFormatedDate(date : string) {
    if(!date){
     return 'NA'
    }
     let formatedDateTime = moment(date).format('MMMM Do YYYY, hh:mm:ss A');
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