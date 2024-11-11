<template>
    <div>
        <h1>Welcome to Your Dashboard</h1>

        <div v-if="user">
            <p><strong>Name:</strong> {{ user.user.nama }}</p>
            <p><strong>Role:</strong> {{ user.user.role }}</p>
            <p><strong>Phone:</strong> {{ user.user.phone }}</p>
            <p><strong>Income:</strong> {{ formatCurrency(user.user.penghasilan) }}</p>
            <p><strong>Birthplace:</strong> {{ user.user.tempat_lahir }}</p>
            <p><strong>Birth Date:</strong> {{ user.user.tanggal_lahir }}</p>

            <p v-if="user.user.role === 'borrower'">
                <strong>Loan Limit:</strong> {{ formatCurrency(user.data.loan_limit) }}
            </p>
            <p v-if="user.user.role === 'lender'">
                <strong>Investment:</strong> {{ formatCurrency(user.data.investment) }}
            </p>
            <p v-if="user.user.role === 'lender'">
                <router-link to="/invest">
                    <button>Invest</button>
                </router-link>

                <router-link to="/investment-history">
                    <button>View Investment History</button>
                </router-link>
            </p>
        </div>

        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'BorrowerDashboard',
    setup() {
        const user = ref(null);
        const router = useRouter();
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const response = await axios.get('/me');
                    user.value = response.data;
                } else {
                    router.push('/login');
                }
            } catch (e) {
                console.error(e);
                router.push('/login');
            }
        };
        const logout = async () => {
            try {
                await axios.post('/logout');
                localStorage.removeItem('token');
                router.push('/login');
            } catch (e) {
                console.error(e);
            }
        };

        const formatCurrency = (value) => {
            const numericValue = parseFloat(value);
            console.log(numericValue)
            if (!isNaN(numericValue)) {
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(numericValue);
            }
            return 'Invalid amount';
        };


        onMounted(() => {
            fetchUserData();
        });

        return {
            user,
            logout,
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

button {
    padding: 10px 20px;
    background-color: #ff6f61;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 20px;
}

button:hover {
    background-color: #ff3b2f;
}

p {
    font-size: 1.2em;
}
</style>