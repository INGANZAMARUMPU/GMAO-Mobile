<template>
    <Base #slot2>
    <div class="w-screen h-[100vh] overflow-auto mb-4 scroll-touch" ref="scrollContainer">
        <div class="w-screen overflow-hidden flex items-center justify-center gap-[10%] mt-2 mb-0 pb-2">
            <button class="custom-box custom-right" @click="isModalVisible = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
        </div>

        <div class="w-screen relative flex justify-center my-2" v-if="$store.state.user.default_page === 'maintenance'">
            <button
                class="w-12 h-12 flex justify-center items-center bg-sky-900/90 rounded-xl fixed bottom-30 right-6 shadow-[1px_1px_5px_1px_rgba(0,0,0,0.5)]"
                @click="this.$router.go('/Inventaire')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="#ffffff"
                        d="M5.53 17.506q-.978-1.142-1.504-2.558T3.5 12q0-3.616 2.664-6.058T12.5 3.5V2l3.673 2.75L12.5 7.5V6Q9.86 6 7.93 7.718T6 12q0 1.13.399 2.15t1.13 1.846zM11.5 22l-3.673-2.75L11.5 16.5V18q2.64 0 4.57-1.718T18 12q0-1.13-.399-2.16q-.399-1.028-1.13-1.855l1.998-1.51q.979 1.142 1.505 2.558T20.5 12q0 3.616-2.664 6.058T11.5 20.5z" />
                </svg>
            </button>
        </div>
        <loading v-if="loader" class="w-full mb-3" />
        <div v-if="hasError" class="erreur">
            <div class="message">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01" />
                </svg>
                <p>Une erreur est survenue</p>
                <p class="text-[8px]">veuillez contacter la direction s'il vous plait</p>
                <p class="text-[8px]">ou veuiller vérifier l'état de votre connexion</p>
            </div>
        </div>
        <div class="w-screen h-[100vh]  overflow-auto flex flex-col items-center space-y-3 mb-[57%]">
            <div v-for="item in items" :key="item.oc_asset_objectid"
                class="w-[95%] rounded-sm bg-sky-100  flex flex-col text-sky-900 " @click="selectItem(item)">
                <div class="p-2">
                    <div class="w-full flex items-center justify-between">
                        <p class="font-poppins font-semibold text-[12px] tracking-wider">{{ item.oc_asset_code }}</p>
                        <p class="font-poppins font-semibold text-[9px] tracking-wider">{{ item.oc_asset_nomenclature }}
                        </p>
                        <p class="font-poppins font-normal text-[11px] tracking-wider">{{
                            datetime(item.oc_asset_updatetime) }}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-center">
                        <div class=" w-full  flex items-end">
                            <p class="w-full font-poppins font-semibold text-sm tracking-wider description">
                                {{ formatInstructions(item.oc_asset_description) }}</p>
                        </div>
                        <div class=" w-full flex items-end">
                            <p class="font-poppins text-[12px] tracking-wider flex items-end ">{{
                                item.oc_asset_service }}</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full bg-sky-800/90 flex items-center justify-between p-2 text-white font-poppins font-normal text-[10px] tracking-wider rounded-b-sm ">
                    <p class="" v-if="item?.oc_asset_comment9 == 1">Etat : Bon</p>
                    <p class="" v-if="item?.oc_asset_comment9 == 2">Etat : satisfaisant</p>
                    <p class="" v-if="item?.oc_asset_comment9 == 3">Etat : insatisfaisant</p>
                    <p class="" v-if="item?.oc_asset_comment9 == 4">Etat : Mauvais</p>
                    <p class="" v-if="item?.oc_asset_comment9 == 5">Etat : A remplacer</p>
                    <p class="" v-if="item?.oc_asset_comment9 == ''">Etat : Aucune info</p>
                    <p class="" v-else-if="item?.oc_asset_comment9 == 0">Etat : neuf</p>
                    <p v-if="item?.oc_asset_comment6 == ''">Aucune info</p>
                    <p v-else>{{ item?.oc_asset_comment6 }}</p>
                </div>
            </div>
            <div v-if="this.items.length === 0 && !this.loader" class="">
                <p class="text-sky-900 text-[12px]">Aucune équipement</p>
            </div>
            <div v-if="this.loader" class="">
                <p class="text-sky-900 text-[12px]">Téléchargement en cours .....</p>
            </div>
            <button v-if="$store.state.checksuite" @click="summer"
                class=" flex items-center justify-center border-1 border-sky-950 font-poppins text-sky-950 text-[16px] px-3 gap-1  rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M12 5v14m7-7l-7 7l-7-7" />
                </svg>
                <p>suite</p>
            </button>
        </div>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex justify-center items-end"
            transition="vfm-fade-in-up">
            <div class="modal-inner bg-white rounded-t-4xl shadow-lg transition-transform duration-300 ease-in-out"
                :style="{ bottom: isKeyboardVisible ? `${keyboardHeight}` : 'translateY(0)' }">
                <div class=" p-2 flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950"></div>
                </div>
                <div class="px-3 pt-0 space-y-3">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" @click="isModalVisible = false"
                            viewBox="0 0 24 24">
                            <path fill="none" stroke="#0c4a6e" stroke-linecap="round" stroke-width="2"
                                d="M20 20L4 4m16 0L4 20" />
                        </svg>
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Filtre</p>
                    </div>
                    <input type="text" class="w-[100%] " placeholder="Description" v-model="oc_asset_description">
                    <input type="text" class="w-[100%] " placeholder="Fournisseur" v-model="oc_asset_supplieruid">
                    <div class="w-[100%]  flex justify-between ">
                        <input type="number" class="w-[48%]  rounded-lg p-2" placeholder="code" v-model="oc_asset_code">
                        <input type="number" class="w-[48%]  rounded-lg p-2" placeholder="Numéro de série"
                            v-model="oc_asset_serial">
                    </div>
                    <div class="w-[100%]  flex justify-between ">
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" class="relative w-full rounded-lg  py-1 " placeholder="code"
                                v-model="oc_asset_purchasedate__gte">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                                viewBox="0 0 24 24">
                                <path fill="#014268"
                                    d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                            </svg>
                        </div>
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" class="relative w-full rounded-lg  py-1 " placeholder="code"
                                v-model="oc_asset_purchasedate__lte">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                                viewBox="0 0 24 24">
                                <path fill="#014268"
                                    d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex gap-5 ">
                        <button
                            class="py-1.5 my-1 rounded-lg border-1 border-[#014268] m-0 font-bold text-[#014268] active:text-[#fff] active:bg-[#014268] grow basis-1"
                            @click="vide">Vider</button>
                        <button
                            class="py-1.5 my-1 rounded-lg bg-[#014268] font-bold text-white grow basis-1 active:text-[#014268] active:bg-[#ffff] active:border-1 active:border-[#014268]"
                            @click="FiltrerEquipement">Recherche</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>
    </div>
    </Base>
</template>


<script>
import Base from '../Base.vue'
import axios from '../../axios'
import { VueFinalModal } from 'vue-final-modal'
import { Keyboard } from '@capacitor/keyboard'
import loading from '../../components/loading.vue'
import { handler } from 'tailwindcss-animate'

export default {
    components: {
        VueFinalModal, Base, loading
    },
    data() {
        return {
            isModalVisible: false,
            decodedContent: '',
            isKeyboardVisible: false,
            keyboardHeight: 0,
            items: [],
            scanInterval: null,
            stream: null,
            errorMessage: '',
            hasError: false,
            oc_asset_serial: '',
            oc_asset_code: '',
            oc_asset_purchasedate__lte: '',
            oc_asset_nomenclature: '',
            oc_asset_purchasedate__gte: '',
            oc_asset_supplieruid: '',
            oc_asset_description: '',
            previousInventaireSnapshot: null,
            startY: 0,
            pulling: false,
            refreshing: false,
            count: 1,
            next: '',
            saledate: true,
            loader: false
        }
    },
    methods: {
        vide() {
            this.oc_asset_purchasedate__lte = '';
            this.oc_asset_purchasedate__gte = '';
            this.oc_asset_serial = '';
            this.oc_asset_code = '';
            this.oc_asset_supplieruid = '';
            this.oc_asset_description = '';
            this.oc_asset_nomenclature = '';
        },
        getval() {
            switch (val) {
                case 0:
                    return { label: 'Etat : Neuf', color: 'bg-green-700' };
                case 1:
                    return { label: 'Etat : Bon', color: 'bg-green-600' };
                case 2:
                    return { label: 'Etat : Satisfaisant', color: 'bg-yellow-500' };
                case 3:
                    return { label: 'Etat : Insatisfaisant', color: 'bg-orange-500' };
                case 4:
                    return { label: 'Etat : Mauvais', color: 'bg-red-600' };
                case 5:
                    return { label: 'Etat : À remplacer', color: 'bg-red-800' };
                case '':
                case null:
                case undefined:
                    return { label: 'Etat : Aucune info', color: 'bg-gray-500' };
                default:
                    return { label: 'Etat inconnu', color: 'bg-gray-400' };
            }
        },
        onTouchStart(event) {
            console.log("touch start");
            this.startY = event.touches[0].clientY;
            this.pulling = false;
        },

        onTouchMove(event) {
            console.log("touch move");
            const currentY = event.touches[0].clientY;
            const deltaY = currentY - this.startY;

            const scrollTop = this.$refs.scrollContainer.scrollTop;
            const isAtTop = scrollTop === 0;

            if (deltaY > 60 && isAtTop && !this.refreshing) {
                this.pulling = true;
            }
        },

        onTouchEnd() {
            console.log("touch end");
            if (this.pulling) {
                // this.refreshing = true;
                // this.getInventaire().finally(() => {
                //     this.refreshing = false;
                //     this.pulling = false;
                //     console.log('bok');
                // });
                this.$router.go('/Inventaire')
            }
        },
        selectItem(item) {
            window.localStorage.setItem('code_inventaire', JSON.stringify(item));
            this.$store.state.code_inventaire = JSON.parse(window.localStorage.getItem('code_inventaire'));
            const check = this.$store.state.code_inventaire
            this.$store.state.checkoperation = [this.check]
            console.log('check', check)
            console.log(this.$store.state.code_inventaire)
            this.$router.push('/Plan');
        },
        async FiltrerEquipement() {
            try {
                const params = {
                    oc_asset_code: this.oc_asset_code || '',
                    oc_asset_nomenclature: this.oc_asset_nomenclature || '',
                    oc_asset_service__istartswith: this.$store.state.lieu,
                    oc_asset_purchasedate__gte: this.oc_asset_purchasedate__gte || '',
                    oc_asset_purchasedate__lte: this.oc_asset_purchasedate__lte || '',
                    oc_asset_serial: this.oc_asset_serial || '',
                    oc_asset_supplieruid: this.oc_asset_supplieruid || '',
                    oc_asset_description: this.oc_asset_description || '',
                };

                const response = await axios.get("/oc_assets/", { params });
                this.items = response.data.results;
                this.$store.state.equipements = response.data.results
                this.isModalVisible = false
            } catch (error) {
                console.error("Erreur lors du filtrage :", error);
                const vyose = JSON.parse(window.localStorage.getItem('equipement'))
                this.$store.state.equipements = vyose.filter(item => (item === this.params))
                this.$router.push({ path: '/Inventaire' })
                this.isModalVisible = false

            }
        },
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
            this.isKeyboardVisible = true;
            this.keyboardHeight = event.keyboardHeight;
        },
        summer() {
            this.count++,
                this.getInventaire()
        },
        handleKeyboardHide() {
            this.isKeyboardVisible = false;
            this.keyboardHeight = 0;
        },
        getInventaire() {
            this.loader = true;
            axios.get(`/oc_assets/?page=${this.count}&oc_asset_service__istartswith=${this.$store.state.lieu || this.$store.state.user.default_service_id}&oc_asset_nomenclature__istartswith=E&oc_asset_comment9=${this.$store.state.codeEqui ?? ''}&oc_asset_comment7=${this.$store.state.codeEquistatus ?? ''}&oc_asset_saledate__isnull=${this.saledate}&oc_asset_comment12__lte=${this.$store.state.start_date || ''}`)
                .then((reponse) => {
                    this.items.push(...reponse.data.results)
                    this.next = reponse.data.next
                    console.log(reponse.data.next)
                    this.$store.state.checksuite = this.next
                    this.$store.state.equipements = this.items
                    console.log(this.items)
                    window.localStorage.setItem('equipement', JSON.stringify(this.items))
                    this.$store.state.start_date = ''
                    this.loader = false
                }).catch((error) => {
                    this.$store.state.equipements = JSON.parse(window.localStorage.getItem('equipement'))
                    this.next = false
                    this.loader = false
                })
        }

    },
    mounted() {
        this.windowHeight = window.innerHeight;
        window.addEventListener('resize', this.handleResize);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
        window.addEventListener('online', this.getInventaire);
        if (!this.$store.state.keyword && this.$store.state.equipements.length === 0) {
            console.log('Aucun inventaire en cache, on appelle Getinventaire()')
            this.getInventaire()
        } else {
            console.log('Chargement depuis le cache')
            this.items = this.$store.state.equipements
            console.log('Items affectés:', this.items)
        }

        const numero = this.$route.query.numero
        console.log('Numéro reçu en query :', numero)
    },
    beforeUnmount() {
        Keyboard.removeAllListeners();
        window.removeEventListener('online', this.getOperation);
    },
    // computed: {
    //     equipementInventaire() {
    //         return this.$store.state.equipements;
    //     },
    // },
    watch: {
        "$store.state.equipements": {
            handler(newVal) {
                this.items = newVal
            },
            deep: true
        },
        "$store.state.codeEqui": {
            handler(newVal) {
                this.$store.state.equipements = []
                // this.getInventaire(newVal)
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
<style scoped>
.modal-inner.vfm-fade-in-up-enter-active,
.modal-inner.vfm-fade-in-up-leave-active {
    transition: opacity 2s ease, transform 2s ease;
}

.modal-inner.vfm-fade-in-up-enter-from,
.modal-inner.vfm-fade-in-up-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.modal-inner.vfm-fade-in-up-enter-to,
.modal-inner.vfm-fade-in-up-leave-from {
    opacity: 1;
    transform: translateY(10);
}
</style>