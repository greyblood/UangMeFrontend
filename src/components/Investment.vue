<template>
    <div>
      <h1>Invest</h1>
  
      <form @submit.prevent="submitInvestment">
        <div>
          <label for="amount">Investment Amount (IDR):</label>
          <input v-model="amount" type="number" id="amount" min="1000" required />
        </div>
  
        <div>
          <label for="bank">Choose Bank:</label>
          <select v-model="selectedBank" required>
            <option value="" disabled>Select a bank</option>
            <option value="BCA">BCA</option>
            <option value="BRI">BRI</option>
            <option value="BNI">BNI</option>
            <option value="Mandiri">Mandiri</option>
          </select>
        </div>
  
        <button type="submit">Submit Investment</button>
      </form>
      <router-link to="/investment-history">
                <button>View Investment History</button>
            </router-link>
            
  
      <div v-if="vaNumber">
        <h2>Investment Submitted Successfully!</h2>
        <p>Your Virtual Account (VA) number: {{ vaNumber }}</p>
        <p>Bank: {{ selectedBank }}</p>
      </div>
  
      <div v-if="error" class="error">
        <p>{{ error }}</p>

        
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'LenderInvestment',
    setup() {
      const amount = ref('');
      const selectedBank = ref('');
      const vaNumber = ref(null);
      const error = ref('');
  
      const setAuthHeader = () => {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      };
  
      const submitInvestment = async () => {
        setAuthHeader();
  
        try {
          const response = await axios.post('/lender/investment', {
            amount: amount.value,
            bank: selectedBank.value,
          });
  
          vaNumber.value = response.data.no_va;
          error.value = '';
        } catch (e) {
          console.error(e);
          error.value = 'Investment submission failed. Please try again.';
        }
      };
  
      return {
        amount,
        selectedBank,
        vaNumber,
        error,
        submitInvestment
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  div {
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ff6f61;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ff3b2f;
  }
  
  .error {
    color: red;
  }
  
  h2 {
    font-size: 1.5em;
    color: green;
  }
  </style>
  