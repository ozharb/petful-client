// //eslint-disable-next-line import/no-anonymous-default-export
// export default {
//     //API_ENDPOINT: 'https://petful-server-oz.herokuapp.com/api',
//     //TestingEndpoint://
//     API_ENDPOINT: 'http://localhost:8000/api',
//     TOKEN_KEY: '',
    
    
//   }
  export default {
    REACT_APP_API_BASE: process.env.REACT_APP_API_BASE || 'http://localhost:8000/api'
    }