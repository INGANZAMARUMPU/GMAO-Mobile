<template>
    <div class="w-screen h-screen overflow-hidden bg-[#014268] flex justify-center items-center" @keyup.enter="postLogin">
        <!-- <img src="../assets/view/img/Frame 38.png" alt="" class="fixed"> -->
        <div class="w-80 h-95 bg-white relative rounded-2xl shadow-black shadow-2xl flex overflow-hidden flex-col"
            :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight})` : 'translateY(0)' }">
            <div class="w-full flex justify-center items-center">
                <img src="../assets/view/img/gmao (2).webp" alt="" class="w-[50%]">
            </div>
            <div class="w-full flex flex-col items-center space-y-4 justify-center text-sm">
                <input type="number" v-model="userid"
                    class="w-[90%]  rounded-lg bg-sky-200  font-bold active:border-sky-800 outline-none login"
                    placeholder="Nom de l'utilisateur">
                <input type="password" v-model="password"
                    class="w-[90%]  rounded-lg bg-sky-200  font-bold text-sm active:border-sky-800 outline-none login"
                    placeholder="Mot de passe">
            </div>
            <div class=" w-full flex justify-center items-center my-7">
                <button
                    class="w-[50%] py-3 bg-sky-950 rounded-lg font-Orbitron text-white tracking-wider shadow-slate-400 shadow-xl"
                    @click="postLogin">connecter</button>
            </div>
            <div class="loader">
                <loading v-if="this.$store.state.is_loading" />
            </div>
        </div>
    </div>

</template>

<script>
import { Keyboard } from '@capacitor/keyboard'
import axios from '../axios';
import loading from '../components/loading.vue'

export default {
    components: {
        loading
    },
    data() {
        return {
            isKeyboardVisible: false,
            keyboardHeight: 0,
            userid: '',
            password: '',
            start_date: '2024-01-01',
            end_date: '2025-01-01'
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
                    window.localStorage.setItem('user', JSON.stringify(this.$store.state.user))
                    // this.getStatics()
                    this.$router.push('/');
                    console.log(this.$store.state.user)
                    console.log('bonne nuit')
                })
        },
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