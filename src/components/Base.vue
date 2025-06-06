<template>
    <div class="relative h-screen flex flex-col overflow-y-hidden">
        <div class="py-1">
            <div class="flex justify-between">
                <div class="">
                    <img src="../assets/view/img/gmao (2).webp" alt="" class="w-25 px-1.5 ">
                </div>
                <div class="justify-between items-center flex gap-3 p-4">
                    <div class="">
                        <p class="font-segoe-ui-variable font-semibold text-[10px] "> {{ this.$store.state.user.fullname}}</p>
                        <p for="" class="text-end font-segoe-ui-variable font-light text-[10px] sm:text-[10px]"> {{this.$store.state.user.default_page }}</p>
                        <p for="" class="text-end font-segoe-ui-variable font-light text-[10px] sm:text-[10px]"> {{this.$store.state.user.default_service_id }}</p>
                    </div>
                    <div class="">
                        <div class=" w-full h-full  flex items-center justify-center bg-white rounded-2xl"
                            @click="info = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                                <g fill="none" stroke="#014268" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2">
                                    <path d="M18 20a6 6 0 0 0-12 0" />
                                    <circle cx="12" cy="10" r="4" />
                                    <circle cx="12" cy="12" r="10" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative flex justify-center items-center">
                <div class="flex justify-end items-center">
                    <input type="search" name="" id="" placeholder="Recherche par numero"
                        class="w-80 rounded-sm outline-2 outline-sky-800 text-[13px] font-poppins font-normal px-4 py-2 "
                        v-model="keyword" @keyup.enter="Getinventaire">
                    <div class="absolute  mx-1 flex bg-sky-900 p-1  justify-center items-center rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" @click="Getinventaire"
                            viewBox="0 0 24 24">
                            <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21l-4.3-4.3" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <button class="custom-box custom-bottom" @click="isQRcode = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <g fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path
                            d="M17 12v4a1 1 0 0 1-1 1h-4m5-14h2a2 2 0 0 1 2 2v2m-4 1V7m4 10v2a2 2 0 0 1-2 2h-2M3 7V5a2 2 0 0 1 2-2h2m0 14h.01M7 21H5a2 2 0 0 1-2-2v-2" />
                        <rect width="5" height="5" x="7" y="7" rx="1" />
                    </g>
                </svg>
            </button>
            <div class="py-2">
                <loading v-if="this.$store.state.is_loading" />
            </div>
        </div>
        <div class="h-[90%] overflow-auto">
            <slot v-if="activeSlot === 1" name="slot1"></slot>
            <slot v-else-if="activeSlot === 2" name="slot2"></slot>
            <slot v-else-if="activeSlot === 3" name="slot3"></slot>
            <slot v-else-if="activeSlot === 4" name="slot4"></slot>
            <slot v-else-if="activeSlot === 5" name="slot5"></slot>
        </div>


        <div class=" bottom-0 bg-[#014268]  ">
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
                        <svg width="25" height="25" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_186_1108)">
                                <path
                                    d="M2.222 0L0 2.222L3.91431 8.99123L6.45277 8.61892L21.9475 24.1154L20.6258 25.3846C19.9489 26.0615 19.9489 27.0871 20.6258 27.764L21.3129 28.4528C21.9898 29.1297 23.0255 29.1297 23.5332 28.4528L25.5437 30.4615C25.3745 31.4769 25.5437 32.6835 26.3898 33.5297L35.5384 42.6259C37.4 44.4874 40.4461 44.4874 42.3077 42.6259C44.5077 40.5951 44.4874 37.5591 42.6258 35.6975L33.5297 26.5472C32.6835 25.7011 31.4769 25.3626 30.4615 25.7011L28.2395 23.6923C28.7472 23.0154 28.7472 21.9797 28.2395 21.4703L27.6049 20.8374C27.4511 20.677 27.2664 20.5493 27.0619 20.4621C26.8575 20.3749 26.6375 20.3299 26.4152 20.3299C26.1929 20.3299 25.973 20.3749 25.7685 20.4621C25.5641 20.5493 25.3794 20.677 25.2255 20.8374L24.1154 21.9475L8.62061 6.45277L8.98954 3.91431L2.222 0ZM35.222 0.0524615C31.8831 -0.225077 27.456 1.98846 25.3846 3.91262C22.836 6.46123 23.2523 9.79339 25.278 13.0105L21.6835 16.6066L24.222 19.4615C25.5758 18.2769 27.5728 18.2769 28.9266 19.4615L29.6154 20.1486L29.7745 20.3077L31.2552 18.8269C34.3149 20.6258 37.4998 20.8848 39.9283 18.4563C42.2975 16.2563 44.8664 10.8308 43.6818 7.61539L38.9231 12.5332C38.2461 13.2102 37.2206 13.2102 36.5437 12.5332L31.6241 7.61539C31.4637 7.46154 31.3361 7.27684 31.2489 7.07239C31.1616 6.86794 31.1167 6.64796 31.1167 6.42569C31.1167 6.20342 31.1616 5.98344 31.2489 5.77899C31.3361 5.57454 31.4637 5.38984 31.6241 5.236L36.5454 0.318154C36.1223 0.169231 35.6992 0.0930769 35.222 0.0524615ZM16.6066 21.1538L10.4703 27.2885C9.81081 27.1425 9.13695 27.0716 8.46154 27.0769C3.72308 27.0769 0 30.8 0 35.5385C0 40.2769 3.72308 44 8.46154 44C13.2 44 16.9231 40.2769 16.9231 35.5385C16.9231 34.6703 16.786 33.836 16.5525 33.0525L20.1486 29.4563L19.6206 28.7692C18.2668 27.4154 18.2769 25.3643 19.4615 24.0088L16.6066 21.1538ZM29.722 28.8758C29.9335 28.8758 30.1332 28.9165 30.3025 29.0874L40.2989 39.0822C40.6374 39.4206 40.6374 39.9588 40.2989 40.2972C39.9604 40.6357 39.4189 40.6357 39.0804 40.2972L29.0874 30.3025C28.7489 29.964 28.7489 29.4258 29.0874 29.0874C29.2566 28.9182 29.5105 28.8758 29.722 28.8758ZM9.62584 31.1469L12.8514 34.3742L11.6871 38.7623L7.29892 39.9266L4.07169 36.6994L5.236 32.3112L9.62584 31.1469Z"
                                    fill="#fff" />
                            </g>
                            <defs>
                                <clipPath id="clip0_186_1108">
                                    <rect width="44" height="44" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Equipement</p>
                </div>
                <div class="flex flex-col items-center gap-1" @click="navigate('/Infrastructure')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl',
                        activeSlot === 5 ? 'bg-amber-50' : ''
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
                <div v-if="keyword" class="mt-4 text-green-600 font-semibold">
                    QR Code détecté : {{ keyword }}
                </div>
            </div>
        </VueFinalModal>
        <VueFinalModal v-model="isDeconnection" :click-to-close="true" class="flex items-center justify-center">
            <div
                class="w-70 bg-white shadow-lg overflow-hidden flex flex-col justify-center items-center rounded-sm py-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <g fill="none" stroke="#0c4a6e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                        <path d="M9 16c.85-.63 1.885-1 3-1s2.15.37 3 1m-5.5-5.5V10m5 .5V10" />
                        <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
                    </g>
                </svg>
                <p class="font-poppins">Voulez-vous se deconnecter</p>
                <button @click="logout"
                    class="bg-white border-2 border-sky-900 px-2 py-1 rounded-sm text-sky-950 mt-3 font-poppins text-[12px]">Déconnection</button>
            </div>
        </VueFinalModal>
        <VueFinalModal v-model="info" :click-to-close="true" class="flex items-center justify-center">
            <div
                class="w-70 bg-white shadow-lg overflow-hidden flex flex-col justify-center items-center rounded-lg py-4">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                                <g fill="none" stroke="#014268" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2">
                                    <path d="M18 20a6 6 0 0 0-12 0" />
                                    <circle cx="12" cy="10" r="4" />
                                    <circle cx="12" cy="12" r="10" />
                                </g>
                            </svg>
                            <div class="w-full px-3 mt-2 flex flex-col gap-3">
                                <div class="w-full bg-sky-300/30 rounded-lg flex justify-between items-center px-2 py-2">
                                    <p class="font-poppins font-semibold text-[14px] ">Nom</p>
                                    <p class="font-poppins text-[11px]">{{ this.$store.state.user.fullname}}</p>
                                </div>
                                <div class="w-full bg-sky-300/30 rounded-lg flex justify-between items-center px-2 py-2">
                                    <p class="font-poppins font-semibold text-[14px] ">Poste</p>
                                    <p class="font-poppins text-[11px]">{{ this.$store.state.user.default_page}}</p>
                                </div>
                                <div class="w-full bg-sky-300/30 rounded-lg flex justify-between items-center px-2 py-2">
                                    <p class="font-poppins font-semibold text-[14px] ">Service</p>
                                    <p class="font-poppins text-[11px]">{{ this.$store.state.user.default_service_id}}</p>
                                </div>
                            </div>
                <button @click="isDeconnection = true"
                    class="bg-white border-2 border-sky-900 px-2 py-1 rounded-sm text-sky-950 mt-3 font-poppins text-[12px]">Se deconnecter</button>
            </div>
        </VueFinalModal>
    </div>

</template>

<script>
import axios from '../axios';
import { VueFinalModal, vueFinalModalProps } from 'vue-final-modal'
import jsQR from 'jsqr'
import loading from './loading.vue'
export default {
    components: {
        VueFinalModal, loading
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
                case '/Infrastructure':
                    return 5;
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
            keyword: '',
            startY: 0,
            pulling: false,
            refreshing: false,
            isDeconnection: false,
            info: false,

        }
    },
    methods: {
        logout() {
            this.$store.state.user = null;
            this.$store.state.code_inventaire = [];
            this.$store.state.plan = [],
                this.$store.state.keyword = "",
                this.$store.state.equipements = [],
                this.$store.state.PlanMaintance = [],
                this.$store.state.Operation = [],
                this.$store.state.code_inventaire = [],
                this.$store.state.code_plan = [],
                this.$store.state.user = null
            this.$store.state.is_loading = false
            this.$store.state.static = [],
                this.$store.state.infrastructures = [],
                this.$store.state.choice = '',
                window.localStorage.clear();

        },
        onTouchStart(event) {
            this.startY = event.touches[0].clientY;
        },
        onTouchMove(event) {
            const currentY = event.touches[0].clientY;
            if (currentY - this.startY > 60 && !this.refreshing) {
                this.pulling = true;
            }
        },
        onTouchEnd() {
            if (this.pulling) {
                this.refreshing = true;
                this.Getinventaire().finally(() => {
                    this.refreshing = false;
                    this.pulling = false;
                });
            }
        },
        Getinventaire() {
            this.$store.state.keyword = this.keyword
            console.log('bonjour')
            // this.$store.state.equipements = null
            axios.get(`/oc_assets/?search=${this.keyword}&oc_asset_service__startswith= ${this.$store.state.user.default_service_id}&oc_asset_nomenclature__startswith=E`)
                .then((reponse) => {
                    this.$store.state.equipements = reponse.data.results
                    this.$router.push({ path: '/Inventaire' })
                    console.log(this.items)
                }).catch((error) => {
                    const vyose = JSON.parse(window.localStorage.getItem('equipement'))
                    this.$store.state.equipements = vyose.filter(item => (item.oc_asset_code === this.$store.state.keyword))
                    this.$router.push({ path: '/Inventaire' })
                })
            axios.get(`/oc_assets/?search=${this.keyword}&oc_asset_service__startswith=${this.$store.state.user.default_service_id}&oc_asset_nomenclature__startswith=I`)
                .then((reponse) => {
                    this.$store.state.infrastructures = reponse.data.results
                    this.$router.push({ path: '/Inventaire' })
                    console.log(reponse.data)
                }).catch((error) => {
                    const vyose = JSON.parse(window.localStorage.getItem('infrastructure'))
                    this.$store.state.infrastructures = vyose.filter(item => (item.oc_asset_code === this.$store.state.keyword))
                    this.$router.push({ path: '/Inventaire' })
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
                        this.keyword = code.data
                        this.Getinventaire()
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