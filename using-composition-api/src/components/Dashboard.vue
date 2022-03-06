<template>
    <div>
        <container-card>
            <div>
                <h2 class="textCenter">Welcome {{ userDetails.userName }}</h2>
                <div>
                    <p>Your details:</p>
                    <ul>
                        <li>Your name: {{ userDetails.userName }}</li>
                        <li>Email: {{ userDetails.email }}</li>
                        <li>Password: {{ userDetails.password }}</li>
                    </ul>
                </div>
                <div>
                    <p>Want to logout?</p>
                    <custom-button @click="logout">Logout</custom-button>
                </div>
            </div>
        </container-card>
    </div>
</template>

<script>
import CustomButton from './ui/CustomButton.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: {
        'custom-button': CustomButton,
    },
    setup(){
        const router = useRouter();
        const store = useStore();
        
        function logout(){
            store.dispatch('logout');
            router.replace('/login');
        }

        const userDetails = computed(function(){
            return store.getters['userDetails'];
        });

        return{
            logout,
            userDetails,
        };
    },
}
</script>