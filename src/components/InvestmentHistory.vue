<template>
    <div>
      <h1>Investment History</h1>
  
      <table v-if="investmentHistory.length > 0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount (IDR)</th>
            <th>Bank</th>
            <th>VA Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(investment, index) in investmentHistory" :key="index">
            <td>{{ investment.date }}</td>
            <td>{{ formatCurrency(investment.amount) }}</td>
            <td>{{ investment.bank }}</td>
            <td>{{ investment.no_va }}</td>
          </tr>
        </tbody>
      </table>
  
      <div v-else>
        <p>No investment history available.</p>
      </div>

      <router-link to="/dashboard">
                <button>Back to Dashboard</button>
            </router-link>
        
  
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'InvestmentHistory',
    setup() {
      const investmentHistory = ref([]);
      const error = ref('');
  
      const fetchInvestmentHistory = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
            const response = await axios.get('/lender/investment-history');
            investmentHistory.value = response.data.investment_history;
            error.value = '';
          } else {
            error.value = 'Token not found. Please log in.';
          }
        } catch (e) {
          console.error(e);
          error.value = 'Failed to fetch investment history. Please try again later.';
        }
      };
  
      const formatCurrency = (value) => {
        if (value) {
          return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
        }
        return value;
      };

      onMounted(() => {
        fetchInvestmentHistory();
      });
  
      return {
        investmentHistory,
        error,
        formatCurrency,
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  .error {
    color: red;
  }
  
  p {
    font-size: 1.2em;
  }
  </style>
  