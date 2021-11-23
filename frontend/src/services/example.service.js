import axiosInterceptor from './custom.axios-interceptor';

const API_URL = 'http://localhost:3001/api/example/';


// Example requests

const getBooks = () => {
  return axiosInterceptor.get(API_URL + 'books').then((response) => {
    console.log("All the Books:", response);
  });
};

const addBook = (exampleParam) => {
  const sampleBook = {
    author: "Don Seagle",
    country: exampleParam, // showing that params can be passed in from React component to this service
    language: "English",
    pages: 155,
    title: "Stoppable",
    year: 2003
  };
  
  // backend api restricts access to this endpoint for admins only (i.e. access tokens with role "admin")
  return axiosInterceptor.post(API_URL + 'books', sampleBook).then((response) => {
    console.log("Success:", response.data);
  }).catch((err) => {
    console.log("Error adding new book!");
    console.log("data:", err.response.data);
    console.log("status:", err.response.status);
    console.log("headers:", err.response.headers);
  });
};


const ExampleService = {
  getBooks,
  addBook
};

export default ExampleService;

////////////////////Refactored///////////////////////////////////
// Everything below can be put into a handler function directly
// inside TestPage, but won't be as modular or clean.

// const API_URL = 'http://localhost:3001/api/example/';

// api.get(API_URL + 'books').then((response) => {
  
//   console.log("All the Books:", response);
// });

// const sampleBook = {
//   author: "Don Seagle",
//   country: "Canada",
//   language: "English",
//   pages: 155,
//   title: "Stoppable",
//   year: 2003
// };
// api.post(API_URL + 'books', sampleBook).then((response) => {
  
//   console.log("All the Books:", response.data);
// }).catch((err) => {
//   console.log("Error Putting new book HA!", err);
// });
/////////////////////////////////////////////////////////////////