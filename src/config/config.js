import axios from "axios";

console.log("process.env.REACT_APP_BASEURL" , process.env.REACT_APP_BASEURL)

export const withoutAuthAxios = () => {
    return axios.create( {
      //baseURL: process.env.REACT_APP_BASEURL,
      baseURL:process.env.REACT_APP_BASEURL
    } );
  };