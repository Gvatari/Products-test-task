<template>
  <div class="v-products">
    <div class="v-products_add-product">
      <input 
        class="v-products_input" 
        type="text" 
        v-model="inputValue"
      >
      <button 
        class="v-products_button" 
        @click="addProduct"
      >
        Добавить продукт
      </button>
    </div>
    <div 
      class="v-products_content" 
      v-for="(item, index) of data"
    >
      <div class="v-products_number">
        {{ index + 1 }}
      </div>
      <div 
        :class="{ 'completed': item.completed }"
        class="v-products_name">
        {{ item.title }}
      </div>
      <button 
        :disabled="item.completed"
        class="v-products_delete" 
        @click="deleteProduct(index)"
      >
        Вычеркнуть продукт
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const inputValue = ref('');

const data = computed(() => store.getters.getProducts);

const addProduct = () => {
  if (inputValue.value !== '') {
    const newItem = {
      userId: 1,
      id: data.value.length + 1,
      title: inputValue.value,
      completed: false,
    };

    data.value.unshift(newItem);
    inputValue.value = "";

    saveToLocalStorage();
  }
}

const deleteProduct = (index) => {
  const item = data.value[index];
  
  if (!item.completed) {
    item.completed = true;
    // Удаляем элемент из текущего места
    data.value.splice(index, 1);
    // Добавляем элемент в конец списка
    data.value.push(item);

    saveToLocalStorage();
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem('products', JSON.stringify(data.value));
}

onMounted(() => {
  const savedProducts = localStorage.getItem('products');
  
  if (savedProducts) {
    store.commit('setProducts', JSON.parse(savedProducts));
  } else {
    store.dispatch('fetchProducts');
  }
})


</script>

<style lang="scss">
    .v-products {
        display: flex;
        flex-direction: column;
        margin: 20px 100px;

        &_add-product {
          display: flex;
          margin: 0 0 10px 20px;
        }

        &_input {
          height: 32px;
          width: 320px;
          outline: none;
          padding: 0 12px;
          border-radius: 4px;
          border: 1px solid #000;
        }

        &_button {
          margin-left: 10px;
          background: #fff;
          border: 1px solid #5c6db7;
          border-radius: 4px;
          padding: 0 4px;
          cursor: pointer;
          transition: 0.2s;
        }

        &_button:hover {
          background: #cadbff;
        }

        &_button:active {
          background: #b7ceff;
        }

        &_content {
          display: flex;
          padding: 20px;
          border-bottom: 1px solid red;
        }

        &_name.completed {
          text-decoration: line-through;
        }

        &_number {
          font-weight: 600;
          margin-right: 10px;
        }

        &_delete {
          margin-left: auto;
          background: #fff;
          border: 1px solid #b7685c;
          border-radius: 4px;
          padding: 0 4px;
          cursor: pointer;
          transition: 0.2s;
        }

        &_delete:hover {
          background: #cbbebc;
        }

        &_delete:active {
          background: #c5a098;
        }

        &_delete[disabled]:hover {
          background: none;
          cursor: default;
        }

        &_delete[disabled]:active {
          background: none;
          cursor: default;
        }
    }
</style>