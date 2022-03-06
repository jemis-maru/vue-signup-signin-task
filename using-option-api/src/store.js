import { createStore } from "vuex";

const store = createStore({
    state(){
        return{
            userName: '',
            email: '',
            password: '',
            isLoginFailed: false,
            isAuth: false,
        };
    },
    mutations: {
        login(state, payload){
            state.isLoginFailed = false;
            state.isAuth = true;
            state.userName = payload.userName;
            state.email = payload.email;
            state.password = payload.password;
        },
        loginFailed(state){
            state.isLoginFailed = true;
        },
        logout(state){
            state.isLoginFailed = false;
            state.isAuth = false;
            state.userName = '';
            state.email = '';
            state.password = '';
        },
        loginRequired(state){
            state.isAuth = false;
        },
    },
    actions: {
        register(_, payload){
            sessionStorage.setItem("userName", payload.userName);
            sessionStorage.setItem("email", payload.email);
            sessionStorage.setItem("password", payload.password);
        },
        fetchData(context){
            let fetchUserData = {};
            fetchUserData.userName =  sessionStorage.getItem("userName");
            fetchUserData.email = sessionStorage.getItem("email");
            fetchUserData.password = sessionStorage.getItem("password");
            context.commit('login', fetchUserData);
        },
        login(context, payload){
            if(payload.email == sessionStorage.getItem("email") && payload.password == sessionStorage.getItem("password")){
                sessionStorage.setItem("isAlreadyLogin", "yes");
                return context.dispatch('fetchData');
            }
            else{
                context.commit('loginFailed');
            }
        },
        isAlreadyLogin(context){
            if(sessionStorage.getItem("isAlreadyLogin") == "yes"){
                return context.dispatch('fetchData');
            }
            else{
                context.commit('loginRequired');
            }
        },
        logout(context){
            sessionStorage.removeItem("isAlreadyLogin");
            context.commit('logout');
        },
    },
    getters: {
        loginFailed(state){
            return state.isLoginFailed;
        },
        userDetails(state){
            return {
                userName: state.userName,
                email: state.email,
                password: state.password,
            };
        },
        isAuth(state){
            return state.isAuth;
        },
    },
});

export default store;