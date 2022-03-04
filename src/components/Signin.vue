<template>
    <div>
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

export default {
    components: {
        'custom-button': CustomButton,
    },
    data(){
        return{
            email: '',
            password: '',
            anyError: false,
        };
    },
    methods: {
        submitForm(){
            this.anyError = false;
            if(!this.isEmailValid || !this.isPasswordValid){
                // console.log('validation failed');
                this.anyError = true;
                return;
            }
            console.log(this.email);
            console.log(this.password);
            this.email = '';
            this.password = '';
        },
    },
    computed: {
        isEmailValid(){
            const regx = new RegExp(/^[a-zA-Z0-9]{1,}[a-zA-Z0-9.-_]{1,}@[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}[.]{0,1}[a-zA-Z]{0,}$/);
            // console.log(regx.test(this.email));
            if(this.email === '' || !regx.test(this.email)){
                return false;
            }
            return true;
        },
        isPasswordValid(){
            if(this.password.length < 8){
                return false;
            }
            return true;
        },
    },
}
</script>