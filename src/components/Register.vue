<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <input v-model="nama" placeholder="Name" type="text" required />

            <input v-model="tempatLahir" placeholder="Birth Place" type="text" required />

            <input v-model="tanggalLahir" placeholder="Birth Date" type="date" required />

            <input v-model="phone" placeholder="Phone Number" type="text" required />

            <input v-model="noKtp" placeholder="KTP Number" type="text" required />

            <input type="file" @change="handleFileUpload" required />

            <div v-if="role === 'lender'">
                <input v-model="npwp" placeholder="NPWP (Required for Lender)" type="text" />
            </div>

            <input v-model="penghasilan" placeholder="Monthly Income" type="number" required />

            <input v-model="password" placeholder="Password" type="password" required />

            <select v-model="role">
                <option value="borrower">Borrower</option>
                <option value="lender">Lender</option>
            </select>

            <button type="submit">Register</button>
        </form>

        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'UserRegister',
    setup() {
        const nama = ref('');
        const tempatLahir = ref('');
        const tanggalLahir = ref('');
        const phone = ref('');
        const noKtp = ref('');
        const penghasilan = ref('');
        const password = ref('');
        const role = ref('borrower');
        const npwp = ref('');
        const fotoKtp = ref(null);
        const error = ref('');
        const router = useRouter();

        const handleFileUpload = (event) => {
            fotoKtp.value = event.target.files[0];
        };

        const register = async () => {
            if (role.value === 'lender' && !npwp.value) {
                error.value = 'NPWP is required for Lender';
                return;
            }

            if (!fotoKtp.value) {
                error.value = 'Please upload your KTP file';
                return;
            }

            const formData = new FormData();
            formData.append('nama', nama.value);
            formData.append('tempat_lahir', tempatLahir.value);
            formData.append('tanggal_lahir', tanggalLahir.value);
            formData.append('phone', phone.value);
            formData.append('no_ktp', noKtp.value);
            formData.append('penghasilan', penghasilan.value);
            formData.append('password', password.value);
            formData.append('role', role.value);
            formData.append('foto_ktp', fotoKtp.value);

            if (role.value === 'lender' && npwp.value) {
                formData.append('npwp', npwp.value);
            }

            try {
                await axios.post('/register', formData);
                router.push('/login');
            } catch (e) {
                console.error(e);
                error.value = e.response?.data?.message || 'Registration failed';
            }
        };

        return {
            nama,
            tempatLahir,
            tanggalLahir,
            phone,
            noKtp,
            penghasilan,
            password,
            role,
            npwp,
            fotoKtp,
            error,
            handleFileUpload,
            register,
        };
    },
};
</script>