import axios from 'axios';

const fetchProducts = () => {
  return axios.get("http://127.0.0.1:8000/cart/")
    .then(response => {
      const products = response.data; // Assuming the response contains the updated data
      console.log('Data fetched from the backend:', products);
      return products;
    })
    .catch(error => {
      console.error('Error fetching data from the backend:', error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    });
};

export default fetchProducts;
