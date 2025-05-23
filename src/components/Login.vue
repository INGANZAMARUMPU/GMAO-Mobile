<template>
    <div class="w-screen h-screen overflow-hidden bg-sky-950 flex justify-center items-center"
        :style="{ transform: isKeyboardVisible ? `translateY(-100px)` : 'translateY(0)' }">
        <img src="../assets/view/img/Frame 38.png" alt="" class="fixed">
        <div class="w-80 h-100 bg-white relative rounded-2xl shadow-black shadow-2xl flex overflow-hidden flex-col">
            <div class="w-full h-[40%] flex justify-center items-center">
                <img src="../assets/view/img/unnamed.jpg" alt="" class="w-[50%]">
            </div>
            <div class="w-full h-[35%] flex flex-col items-center space-y-5 justify-center text-sm">
                <input type="text" class="w-[90%] h-[35%] rounded-lg bg-sky-200 p-2 font-bold active:border-sky-800 outline-none"
                    placeholder="Nom de l'utilisateur">
                <input type="text"
                    class="w-[90%] h-[35%] rounded-lg bg-sky-200 p-2 font-bold text-sm active:border-sky-800 outline-none"
                    placeholder="Mot de passe">
            </div>
            <div class=" w-full h-[25%] flex justify-center items-center">
                <button
                    class="w-[50%] h-[50%] bg-sky-950 rounded-lg font-Orbitron text-white tracking-wider shadow-slate-400 shadow-xl"
                    @click="$router.push('/equipement')">connecter</button>
            </div>
        </div>
    </div>

</template>

<script>
import { Keyboard } from '@capacitor/keyboard'

export default {
    data() {
        return {
            isKeyboardVisible: false,
            keyboardHeight: 0,
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
    },
    mounted(){
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