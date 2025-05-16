<template>
    <div class="w-screen h-screen">
        <div class="w-screen h-[10%] overflow-hidden flex items-center justify-center gap-[10%]">
            <button
                class="custom-box custom-left"
                @click="isModalVisible = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
            {{ decodedContent.p }}
            <button
                class="custom-box custom-right"
                @click="isQRcode = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                    <g fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path
                            d="M17 12v4a1 1 0 0 1-1 1h-4m5-14h2a2 2 0 0 1 2 2v2m-4 1V7m4 10v2a2 2 0 0 1-2 2h-2M3 7V5a2 2 0 0 1 2-2h2m0 14h.01M7 21H5a2 2 0 0 1-2-2v-2" />
                        <rect width="5" height="5" x="7" y="7" rx="1" />
                    </g>
                </svg>
            </button>
        </div>
        <div class="w-screen h-full flex flex-col items-center space-y-3 shadow-xl">
            <div v-for="item in items" :key="item.id"
                class="w-[90%] rounded-2xl bg-sky-100 overflow-hidden flex flex-col text-sky-900">
                <div class="p-2">
                    <div class="w-full flex items-center justify-between">
                        <p class="font-poppins font-semibold text-sm tracking-wider">{{ item.id }}</p>
                        <p class="font-segoe font-normal text-xs tracking-wider">{{ item.date }}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-center">
                        <div class=" w-full h-[50%] flex items-end">
                            <div class="flex items-center space-x-2">
                                <p class="font-poppins font-semibold text-lg tracking-wider">{{ item.nom }}</p>
                                <p class="font-poppins font-semibold text-xs tracking-wider">({{ item.code }})</p>
                            </div>
                        </div>
                        <div class=" w-full flex items-end">
                            <p class="font-poppins text-xs tracking-wider flex items-end ">{{ item.localisation }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full bg-green-800 flex items-center justify-between p-2 text-white font-poppins font-normal text-xs tracking-wider">
                    <p class="">Mise à jour</p>
                    <p class="">{{ item.maj }}</p>
                </div>
            </div>
        </div>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex justify-center items-end"
            transition="vfm-fade-in-up">
            <div class="bg-white rounded-t-4xl shadow-lg  overflow-hidden">
                <div class=" p-2 flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950"></div>
                </div>
                <div class="p-4 pt-0 space-y-4">
                    <div class="flex items-center content-between!">
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Filtre</p>
                    </div>
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Nomanclature">
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Description">
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Fournisseur">
                    <div class="w-[100%]  flex space-x-7 ">
                        <input type="number"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="code">
                        <input type="number"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="Numéro de série">
                    </div>
                    <div class="w-[100%]  flex space-x-7 ">
                        <input type="date"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="Nomanclature">
                        <input type="date"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="Nomanclature">
                    </div>
                    <div class="flex gap-5 ">
                        <button class="py-3 rounded-lg bg-sky-950 m-0 font-bold text-white grow basis-1">Vider</button>
                        <button class="py-3 rounded-lg bg-sky-950 font-bold text-white grow basis-1">Recherche</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>
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
import { VueFinalModal } from 'vue-final-modal'
import jsQR from 'jsqr'

export default {
    components: {
        VueFinalModal,
    },
    data() {
        return {
            isModalVisible: false,
            isQRcode: false,
            decodedContent: '',
            items: [
                {
                    id: '1.10658',
                    date: '12-02-2023',
                    nom: 'centrifugeuse',
                    code: 'ERTF',
                    localisation: 'BI.BU.MUHDRWIBAGA.10 - LABORATOIRE',
                    maj: '12-02-2023'
                },
                {
                    id: '1.10658',
                    date: '12-02-2023',
                    nom: 'centrifugeuse',
                    code: 'ERTF',
                    localisation: 'BI.BU.MUHDRWIBAGA.10 - LABORATOIRE',
                    maj: '12-02-2023'
                },
                {
                    id: '1.10658',
                    date: '12-02-2023',
                    nom: 'centrifugeuse',
                    code: 'ERTF',
                    localisation: 'BI.BU.MUHDRWIBAGA.10 - LABORATOIRE',
                    maj: '12-02-2023'
                }
            ],
            scanInterval: null,
            stream: null
        }
    },
    methods: {
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
        }
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
    beforeUnmount() {
        this.stopScanner()
    }
}
</script>



<style scoped></style>