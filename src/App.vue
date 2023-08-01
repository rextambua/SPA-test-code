<template>
  <div class="container">
    <h1>Product List</h1>
    <div>
      <input v-model="newProduct" @keyup.enter="addNewProduct" placeholder="Add a new product" />
      <button @click="addNewProduct">Add</button>
    </div>
    <ul>
      <li
          v-for="product in products"
          :key="product.id"
          :class="{ 'crossed-out': product.crossedOut }"
          @click="toggleProduct(product)"
      >
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      newProduct: '',
    };
  },
  computed: {
    ...mapState(['products']),
  },
  methods: {
    ...mapActions(['addProduct', 'toggleProduct']),

    addNewProduct() {
      if (this.newProduct.trim() !== '') {
        this.addProduct(this.newProduct.trim());
        this.newProduct = '';
      }
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  display: inline;
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.crossed-out {
  text-decoration: line-through;
  opacity: 0.7;
}

/* Styling for the top product (last child) in the list */
li:last-child {
  border-bottom: none;
}

/* Hover effect for list items */
li:hover {
  background-color: #f5f5f5;
}

/* Styling for the list when it's empty */
ul:empty::before {
  content: 'No products added yet.';
  display: block;
  text-align: center;
  padding: 10px;
}

/* Center the "No products added yet" message */
ul:empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Clear button styles */
button:focus {
  outline: none;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
