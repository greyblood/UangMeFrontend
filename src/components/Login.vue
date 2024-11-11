<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="phone" placeholder="Phone Number" type="text" required autocomplete="current-phone" />
            <input v-model="password" placeholder="Password" type="password" required autocomplete="current-password" />
            <button type="submit">Login</button>
        </form>

        <p>{{ error }}</p>

        <p>
            Don't have an account?
            <router-link to="/register" class="register-link">Register here</router-link>
        </p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: 'UserLogin',
    setup() {
        const phone = ref('');
        const password = ref('');
        const error = ref('');
        const router = useRouter();

        const login = async () => {
            try {
                const response = await axios.post('/login', {
                    phone: phone.value,
                    password: password.value,
                });
                localStorage.setItem('token', response.data.token);
                router.push('/dashboard');
            } catch (e) {
                error.value = 'Login failed';
            }
        };

        return { phone, password, error, login };
    },
};
</script>
