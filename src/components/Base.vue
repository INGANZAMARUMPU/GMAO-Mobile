<template>
    <div class="relative h-screen flex flex-col overflow-y-hidden">
        <div class="py-1">
            <div class="flex justify-between">
                <div class="">
                    <img src="../assets/view/img/unnamed.jpg" alt="" class="w-40 ">
                </div>
                <div class="justify-between items-center flex gap-3 p-5">
                    <div class="">
                        <p class="font-segoe-ui-variable font-semibold text-[10px] "> {{ this.$store.state.user.fullname }}
                        </p>
                        <p for="" class="font-segoe-ui-variable font-light text-[10px] sm:text-[10px]"> {{ this.$store.state.user.businessfunction }}
                            Electronique</p>
                    </div>
                    <div class="">
                        <div class=" w-full h-full  flex items-center justify-center bg-white rounded-2xl"
                            @click="logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="none" stroke="#014268" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative flex justify-center items-center">
                <div class="flex justify-end items-center">
                    <input type="number" name="" id="" placeholder="Recherche par numero"
                        class="w-84 rounded-sm outline-2 outline-sky-800 text-[13px] font-poppins font-normal px-4 py-3.5 "
                        v-model="search_equipement">
                    <div class="absolute  mx-2 flex bg-sky-900 p-2  justify-center items-center rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" @click="Getinventaire"
                            viewBox="0 0 24 24">
                            <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21l-4.3-4.3" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <button class="custom-box custom-bottom" @click="isQRcode = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 24 24">
                    <g fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path
                            d="M17 12v4a1 1 0 0 1-1 1h-4m5-14h2a2 2 0 0 1 2 2v2m-4 1V7m4 10v2a2 2 0 0 1-2 2h-2M3 7V5a2 2 0 0 1 2-2h2m0 14h.01M7 21H5a2 2 0 0 1-2-2v-2" />
                        <rect width="5" height="5" x="7" y="7" rx="1" />
                    </g>
                </svg>
            </button>
        </div>
        <div class="h-[90%] overflow-auto">
            <slot v-if="activeSlot === 1" name="slot1"></slot>
            <slot v-else-if="activeSlot === 2" name="slot2"></slot>
            <slot v-else-if="activeSlot === 3" name="slot3"></slot>
            <slot v-else-if="activeSlot === 4" name="slot4"></slot>
        </div>

        <div class=" bottom-0 bg-sky-900  ">
            <div class="w-screen flex items-end justify-between px-6">
                <div class="flex flex-col items-center gap-1" @click="navigate('/')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl mt-0.5 ',
                        activeSlot === 1 ? 'bg-amber-50' : ''
                    ]"></div>
                    <div class=" flex w-full justify-center">
                        <svg width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="">
                            <path
                                d="M5 5V31.6667C5 32.5507 5.35119 33.3986 5.97631 34.0237C6.60143 34.6488 7.44928 35 8.33333 35H35"
                                stroke="white" stroke-width="4" stroke-miterlimit="5.759" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M11.6667 23.3333L18.3334 16.6666L25.0001 23.3333L35.0001 13.3333" stroke="white"
                                stroke-width="4" stroke-miterlimit="5.759" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M30 13.3333H35V18.3333" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Rapport</p>
                </div>
                <div class="flex flex-col items-center gap-1" @click="navigate('/Inventaire')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl',
                        activeSlot === 2 ? 'bg-amber-50' : ''
                    ]"></div>
                    <div class="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                            viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                            <path fill="#fff"
                                d="M5 22q-.825 0-1.412-.587T3 20V8.725q-.45-.275-.725-.712T2 7V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v3q0 .575-.275 1.013T21 8.724V20q0 .825-.587 1.413T19 22zM5 9v11h14V9zM4 7h16V4H4zm6 7h4q.425 0 .713-.288T15 13t-.288-.712T14 12h-4q-.425 0-.712.288T9 13t.288.713T10 14m2 .5" />
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Infranstructures</p>
                </div>
                <div class="flex flex-col items-center justify-center gap-1.5" @click="navigate('/Plan')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl',
                        activeSlot === 3 ? 'bg-amber-50 ' : ''
                    ]"></div>
                    <div class="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 32 32">
                            <!-- Icon from Carbon by IBM - undefined -->
                            <path fill="#ffff" stroke="#fff" stroke-width="1"
                                d="m29.707 19.293l-3-3a1 1 0 0 0-1.414 0L16 25.586V30h4.414l9.293-9.293a1 1 0 0 0 0-1.414M19.586 28H18v-1.586l5-5L24.586 23zM26 21.586L24.414 20L26 18.414L27.586 20zM20 13v-2h-2.142a4 4 0 0 0-.425-1.019l1.517-1.517l-1.414-1.414l-1.517 1.517A4 4 0 0 0 15 8.142V6h-2v2.142a4 4 0 0 0-1.019.425L10.464 7.05L9.05 8.464l1.517 1.517A4 4 0 0 0 10.142 11H8v2h2.142a4 4 0 0 0 .425 1.019L9.05 15.536l1.414 1.414l1.517-1.517a4 4 0 0 0 1.019.425V18h2v-2.142a4 4 0 0 0 1.019-.425l1.517 1.517l1.414-1.414l-1.517-1.517A4 4 0 0 0 17.858 13zm-6 1a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2" />
                            <path fill="#fff" stroke="#fff" stroke-width="1"
                                d="M12 30H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10h-2V4H6v24h6Z" />
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Plans</p>

                </div>
                <div class="flex flex-col items-center gap-1" @click="navigate('/Operation')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl',
                        activeSlot === 4 ? 'bg-amber-50 ' : ''
                    ]"></div>
                    <div class="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512">
                            <path fill="#ffff" fill-rule="evenodd"
                                d="M362.667 106.667L448 192v277.334H106.667V106.667zm-17.673 42.667h-195.66v277.333h256V209.673zM298.667 42.667l42.667 42.667h-256v320H42.667V42.667zM286.97 209.842c16.137 20.982 21.58 46.795 16.41 65.64q-.969 4.653 68.231 72.545q22.627 22.627 0 45.255q-21.296 21.297-42.593 2.506l-74.869-71.075c-18.847 5.172-44.659-.273-65.64-16.41c-15.39-20.235-20.698-46.684-16.41-65.64l32.82 32.82l32.82-16.41l16.41-32.821l-32.82-32.82c18.956-4.287 45.406 1.02 65.64 16.41" />
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Opérations</p>

                </div>
            </div>
        </div>
        <VueFinalModal v-model="isQRcode" :click-to-close="true" class="flex items-center justify-center">
            <div class="h-100 w-80 bg-white shadow-lg overflow-hidden flex flex-col justify-center items-center">
                <video ref="video" class="w-full h-64 object-cover" autoplay></video>
                <canvas ref="canvas" class="hidden"></canvas>
                <div v-if="decodedContent" class="mt-4 text-green-600 font-semibold">
                    QR Code détecté : {{ decodedContent }}
                </div>
            </div>
        </VueFinalModal>
    </div>

</template>

<script>
import axios from '../axios';
import { VueFinalModal } from 'vue-final-modal'
import jsQR from 'jsqr'
export default {
    components: {
        VueFinalModal
    },
    computed: {
        activeSlot() {
            switch (this.$route.path) {
                case '/':
                    return 1;
                case '/Inventaire':
                    return 2;
                case '/Plan':
                    return 3;
                case '/Operation':
                    return 4;
                default:
                    return 1;
            }
        }
    },
    data() {
        return {
            flipped: false,
            isModalVisible: false,
            isQRcode: false,
            search_equipement: ''

        }
    },
    methods: {
        logout() {
            this.$store.state.user = null;
            window.localStorage.removeItem("user");

        },
        Getinventaire() {
            console.log('bonjour')
            axios.get(`/oc_assetshistory/?search=${this.search_equipement}`)
                .then((reponse) => {
                    this.$store.state.equipement_inventaire = reponse.data.results
                    this.$router.push({ path: '/Inventaire' })
                    console.log(this.items)
                })
            axios.get(`/oc_maintenanceoperations/?search=${this.search_equipement}`)
                .then((reponse) => {
                    this.$store.state.Operation = reponse.data.results
                    console.log(this.items)
                })
            axios.get(`/oc_maintenanceplanshistory/?search=${this.search_equipement}`)
                .then((reponse) => {
                    this.$store.state.PlanMaintance = reponse.data.results
                    console.log(this.items)
                })
                
        },
        navigate(path) {
            if (this.$route.path !== path) {
                this.$router.push(path);
            }
        },
        flip() {
            this.flipped = !this.flipped
        },
        async startScanner() {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                this.$refs.video.srcObject = this.stream

                this.scanInterval = setInterval(() => {
                    const video = this.$refs.video
                    const canvas = this.$refs.canvas
                    const context = canvas.getContext('2d')
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight
                    context.drawImage(video, 0, 0, canvas.width, canvas.height)
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
                    const code = jsQR(imageData.data, canvas.width, canvas.height)
                    if (code) {
                        this.decodedContent = code.data
                        this.stopScanner()
                        this.isQRcode = false
                    }
                }, 500)
            } catch (error) {
                console.error('Erreur lors de l’accès à la caméra :', error)
            }
        },
        stopScanner() {
            if (this.scanInterval) {
                clearInterval(this.scanInterval)
                this.scanInterval = null
            }
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop())
                this.stream = null
            }
        },
    },
    watch: {
        isQRcode(newVal) {
            if (newVal) {
                this.startScanner()
            } else {
                this.stopScanner()
            }
        }
    },
    mounted() {

    }
};
</script>


<style>
.perspective {
    perspective: 1000px;
}

.backface-hidden {
    backface-visibility: hidden;
}

.transform-style {
    transform-style: preserve-3d;
}

.rotate-y-180 {
    transform: rotateY(180deg);
}
</style>