import { reactive } from 'vue';
import axios from 'axios';

const store = reactive({
    name: '',
    email: '',
    fetchUser() {
        axios.get('api/user')
            .then(response => {
                store.name = response.data.name;
                store.email = response.data.email;
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem('authenticated');
                    this.$router.push({ name: 'Login' });
                }
            });
    }
});

export default store;
