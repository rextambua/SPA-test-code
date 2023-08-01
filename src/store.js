// store.js

import { createStore } from 'vuex';

const STORE_KEY = 'product-list';

const store = createStore({
    state: {
        products: [],
    },
    mutations: {
        addProduct(state, productName) {
            const product = {
                id: Date.now(),
                name: productName,
                crossedOut: false,
            };
            state.products.unshift(product); // Add the new product to the beginning of the array
        },
        toggleProduct(state, product) {
            const index = state.products.findIndex((p) => p.id === product.id);
            if (index !== -1) {
                const crossedOut = !state.products[index].crossedOut;
                state.products[index].crossedOut = crossedOut;

                if (crossedOut) {
                    // If crossed, remove the product from the list and push it to the end
                    state.products.splice(index, 1);
                    state.products.push(product);
                } else {
                    // If uncrossed, remove the product from the list and insert it back to its original position
                    state.products.splice(index, 1);
                    let insertIndex = state.products.findIndex((p) => p.crossedOut === false);
                    if (insertIndex === -1) {
                        insertIndex = 0;
                    }
                    state.products.splice(insertIndex, 0, product);
                }
            }
        },
    },
    actions: {
        addProduct({ commit }, productName) {
            commit('addProduct', productName);
        },
        toggleProduct({ commit }, product) {
            commit('toggleProduct', product);
        },
    },
    plugins: [
        (store) => {
            store.subscribe((mutation, state) => {
                localStorage.setItem(STORE_KEY, JSON.stringify(state.products));
            });
        },
    ],
});

// Load products from localStorage when initializing the store
const savedProducts = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
store.state.products = savedProducts;

export default store;
