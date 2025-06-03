<template>
    <div class="w-screen h-screen overflow-hidden bg-[#014268] flex justify-center items-center">
        <img src="../assets/view/img/Frame 38.png" alt="" class="fixed">
        <div class="w-80 h-100 bg-white relative rounded-2xl shadow-black shadow-2xl flex overflow-hidden flex-col"
            :style="{ transform: isKeyboardVisible ? `translateY(-100px)` : 'translateY(0)' }">
            <div class="w-full flex justify-center items-center">
                <img src="../assets/view/img/unnamed.jpg" alt="" class="w-[50%]">
            </div>
            <div class="w-full flex flex-col items-center space-y-5 justify-center text-sm">
                <input type="number" v-model="userid"
                    class="w-[90%] py-3 rounded-lg bg-sky-200 p-2 font-bold active:border-sky-800 outline-none"
                    placeholder="Nom de l'utilisateur">
                <input type="password" v-model="password"
                    class="w-[90%] py-3 rounded-lg bg-sky-200 p-2 font-bold text-sm active:border-sky-800 outline-none"
                    placeholder="Mot de passe">
            </div>
            <div class=" w-full flex justify-center items-center mt-10">
                <button
                    class="w-[50%] py-3 bg-sky-950 rounded-lg font-Orbitron text-white tracking-wider shadow-slate-400 shadow-xl"
                    @click="postLogin">connecter</button>
            </div>
        <div class="py-9">
            <loading v-if="this.$store.state.is_loading" />
        </div>
        </div>
        {{ this.$store.state.user }}
    </div>

</template>

<script>
import { Keyboard } from '@capacitor/keyboard'
import axios from '../axios';
import loading from '../components/loading.vue'

export default {
    components:{
        loading
    },
    data() {
        return {
            isKeyboardVisible: false,
            keyboardHeight: 0,
            userid: '',
            password: ''
        }
    },
    methods: {
        handleResize() {
            const currentHeight = window.innerHeight;
            const heightDiff = this.windowHeight - currentHeight;

            if (heightDiff > 150) {
                this.isKeyboardVisible = true;
                this.keyboardHeight = heightDiff;
            } else {
                this.isKeyboardVisible = false;
                this.keyboardHeight = 0;
            }
        },
        handleKeyboardShow(event) {
            if (event?.keyboardHeight) {
                this.keyboardHeight = event.keyboardHeight;
            }
            this.isKeyboardVisible = true;
        },
        handleKeyboardHide() {
            this.isKeyboardVisible = false;
            this.keyboardHeight = 0;
        },
        postLogin() {
            console.log('bonjour')
            let credentials = { userid: this.userid, password: this.password };
            axios.post(`/oc_assets/login/`, credentials)
                .then((reponse) => {
                    this.$store.state.user = reponse.data;
                    this.$router.push('/');
                    console.log(this.$store.state.user)
                    window.localStorage.setItem('user', JSON.stringify(reponse.data))
                })
        }
    },
    mounted() {
        this.windowHeight = window.innerHeight;
        window.addEventListener('resize', this.handleResize);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        Keyboard.removeAllListeners();
    },
}
</script>

<style lang="scss" scoped></style>