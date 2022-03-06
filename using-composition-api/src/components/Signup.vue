<template>
    <div>
        <custom-dialog :show="!!isRegister" routePath="/login" btnName="Login" title="Register successfully" @close="closeDialog">
            <p>{{ isRegister }}</p>
        </custom-dialog>
        <container-card>
            <h2 class="textCenter">Register</h2>
            <div>
                <form @submit.prevent="submitForm">
                    <div class="form-control">
                        <label for="userName">Name</label>
                        <input type="text" id="userName" :class="{'invalidInput': !isUserNameValid}" v-model.trim="userName"/>
                        <p v-if="!isUserNameValid">Please enter valid name.</p>
                    </div>
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
                    <div class="form-control">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" :class="{'invalidInput': !isBothPasswordMatch}" v-model.trim="confirmPassword"/>
                        <p v-if="!isBothPasswordMatch">Password and Confirm Password doesn't matching.</p>
                    </div>
                    <custom-button>Sign up</custom-button>
                    <p v-if="anyError" class="invalidForm">Please fill the form properly then submit</p>
                    <p>Already Register? Go to <router-link class="linkClass" to="/login">Login</router-link></p>
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
        let userName = ref('');
        let email = ref('');
        let password = ref('');
        let confirmPassword = ref('');
        let anyError = ref(false);
        let isRegister = ref(null);

        const store = useStore();

        const isUserNameValid = computed(function(){
            const regx = new RegExp(/^[a-zA-Z]{1,}[_ ]{0,1}[a-zA-Z]{1,}[_ ]{0,1}[a-zA-Z]{1,}$/);
            if(userName.value === '' || !regx.test(userName.value)){
                return false;
            }
            return true;
        });

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

        const isBothPasswordMatch = computed(function(){
            if(password.value != confirmPassword.value){
                return false;
            }
            return true;
        });

        function submitForm(){
            anyError.value = false;
            if(!isUserNameValid.value || !isEmailValid.value || !isPasswordValid.value || !isBothPasswordMatch.value){
                anyError.value = true;
                return;
            }
            store.dispatch('register', {
                userName: userName.value,
                email: email.value,
                password: password.value,
            });
            userName.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';
            isRegister.value = 'Go to login';
        }

        function closeDialog(){
            isRegister.value = null;
        }

        return{
            userName,
            email,
            password,
            confirmPassword,
            anyError,
            isRegister,
            isUserNameValid,
            isEmailValid,
            isPasswordValid,
            isBothPasswordMatch,
            submitForm,
            closeDialog,
        };
    },
}
</script>