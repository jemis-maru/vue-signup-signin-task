<template>
    <div>
        <custom-dialog v-if="!loginFailed" :show="!!isLogin" routePath="/dashboard" btnName="Dashboard" title="Login successfully" @close="closeDialog">
            <p>{{ isLogin }}</p>
        </custom-dialog>
        <custom-dialog v-else :show="!!isLogin" routePath="/login" btnName="Login" title="Login failed" @close="closeDialog">
            <p>Make sure you register.</p>
            <p>Try to login again!</p>
        </custom-dialog>
        <container-card>
            <h2 class="textCenter">Login</h2>
            <div>
                <form @submit.prevent="submitForm">
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" id="email" :class="{'invalidInput': !isEmailValid}" v-model.trim="email"/>
                        <p v-if="!isEmailValid">Please enter valid email.</p>
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" id="password" :class="{'invalidInput': !isPasswordValid}" v-model.trim="password"/>
                        <p v-if="!isPasswordValid">Password length must be greater than or equal to 8.</p>
                    </div>
                    <custom-button>Login</custom-button>
                    <p v-if="anyError" class="invalidForm">Please fill the form properly then submit</p>
                    <p>Not register yet? Go to <router-link class="linkClass" to="/register">Register</router-link></p>
                </form>
            </div>
        </container-card>
    </div>
</template>

<script>
import CustomButton from './ui/CustomButton.vue';
import CustomDialog from './ui/CustomDialog.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        'custom-button': CustomButton,
        'custom-dialog': CustomDialog,
    },
    setup(){
        let email = ref('');
        let password = ref('');
        let anyError = ref(false);
        let isLogin = ref(null);

        const store = useStore();

        const isEmailValid = computed(function(){
            const regx = new RegExp(/^[a-zA-Z0-9]{1,}[a-zA-Z0-9.-_]{1,}@[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}[.]{0,1}[a-zA-Z]{0,}$/);
            if(email.value === '' || !regx.test(email.value)){
                return false;
            }
            return true;
        });

        const isPasswordValid = computed(function(){
            if(password.value.length < 8){
                return false;
            }
            return true;
        });

        const loginFailed = computed(function(){
            return store.getters['loginFailed'];
        });

        function submitForm(){
            anyError.value = false;
            if(!isEmailValid.value || !isPasswordValid.value){
                anyError.value = true;
                return;
            }
            store.dispatch('login', {
                email: email.value,
                password: password.value,
            });
            email.value = '';
            password.value = '';
            isLogin.value = 'Go to Dashboard';
        }

        function closeDialog(){
            isLogin.value = null;
        }

        return{
            email,
            password,
            anyError,
            isLogin,
            isEmailValid,
            isPasswordValid,
            loginFailed,
            submitForm,
            closeDialog,
        };
    },
}
</script>