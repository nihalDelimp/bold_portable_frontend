
import moment from "moment";

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