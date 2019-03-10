import * as axios from 'axios'
const CONSTS = process.env.CONSTS;

// let options = {
//   timeout: 10000,
// }

// // if it's the server build, request from the local IP
// if (process.server) {
//   options.baseURL = `http://${process.env.HOST}:${process.env.PORT}`
// } else if (process.browser) {
//   options.baseURL = ''
// }

// let axiosIns = axios.create(options);

const callService = async ($axios, key, payload = {}, options={}) =>{
  console.log(CONSTS);
  // return {data: "hello"};
  let {url, method} = CONSTS.API_URLS[key];
  if(!url || !method){
      return Promise.reject("Invalid Service Call");
  }
  if(method==="GET"){
      return getData($axios, url,payload, options).then(res=>{
          return res;
      }).catch(err=>{
          // // console.log(err);
          if(err.response){

              if(!options.dont_handle_error){
                  // showAlert({
                  //     title:"Oops!",
                  //     text: typeof err.response.data.message == "string" ? err.response.data.message : "Unknown error, please try again",
                  //     icon: "error"
                  // });
              }
              if(err.response.status == 401){
                  // relogin is required , Logout here
                  // this.loginService.logout();
              }

              throw err.response;
          }else{
              throw {data: {message: "Unknown Error Occured"}};
          }
          // throw err;
      })
  }else{
      return postData($axios, url,payload, options).then(res=>{
          return res;
      }).catch(err=>{
          // // console.log(err);
          if(err.response){
              // console.log(err.response);
              if(!options.dont_handle_error){
                  // showAlert({
                  //     title:"Oops!",
                  //     text: typeof err.response.data.message == "string" ? err.response.data.message : "Unknown error, please try again",
                  //     icon: "error"
                  // });
              }

              if(err.response.status == 401){
                  // relogin is required , Logout here
                  // this.loginService.logout();
              }
              throw err.response;
          }else{
              throw {data: {message: "Unknown Error Occured"}};
          }
          // throw err;
      })
  }
}

const getData = ($axios, url , params = {} , options = {}) => {
  console.log(url);
  return $axios.request({
      method:"GET",
      url,
      params,
  });
}

const postData = ($axios, url, data = {}, options = {}) =>{
  
  return $axios.request({
      method:"POST",
      url,
      data,
  })
}

/* function tokenHandler(config, store) {
  console.log("Came Here");
  if (store.state.user.token && store.state.user.token) {
      console.log("Found Token");
        config.headers.common['Authorization'] =  `Bearer ${store.state.user.token}`;
 }else{
   console.log("Not Authenticated");
   console.log(store)
 }
  return config
} */


export default function ({ $axios, store }) {
  // console.log("Came Here");
  $axios.onRequest(config=>{
      console.log("Intercepted");
      console.log(store.state);
    if (store.state.user.token) {
        config.headers.common['Authorization'] = 'Bearer ' + store.state.user.token
    //   $axios.setToken(store.state.user.token, 'Bearer')
    }
  });
}

export {callService};