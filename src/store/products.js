import axios from 'axios';

export const products = {
  state: {
    products: []
  },
  getters: {
    getProducts (state) {
      return state.products;
    }
  },
  mutations: {
    setProducts(state, products) {
       // Сортируем по полю completed
       const sortedProducts = products.sort((a, b) => {
        return a.completed - b.completed;
      });
      
      state.products = sortedProducts;
    }
  },
  actions: {
    async fetchProducts(ctx) {
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
        ctx.commit('setProducts', data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
