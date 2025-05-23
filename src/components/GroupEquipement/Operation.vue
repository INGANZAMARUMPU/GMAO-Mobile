<template>
    <Base #slot4>
    <div class="w-screen h-full overflow-auto " v-if="!showNewView">
        <div class="w-screen overflow-hidden flex items-center justify-center gap-[10%] my-8 mb-5 pb-4">
            <button class="custom-box custom-left" @click="isModalVisible = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
            <button class="custom-box custom-right" @click="handleNewItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32"
                    viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                    <path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7-7v14" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Nouveau</p>
            </button>
        </div>
        <div v-if="hasError"
            class="flex flex-col items-center justify-center text-red-500 text-sm font-bold px-4 py-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01" />
            </svg>
            <p>Une erreur est survenue</p>
        </div>
        <div v-if="items.length" class="w-screen flex flex-col items-center space-y-3 mb-4">
            <div v-for="item in items" :key="item.oc_maintenanceoperation_objectid"
                class="w-[90%] rounded-2xl bg-sky-100 flex flex-col text-sky-900 p-2" @click="PlusInfo(item)">
                <div class="w-full flex items-center justify-between">
                    <p class="font-poppins font-semibold text-sm tracking-wider">{{
                        item.oc_maintenanceoperation_maintenanceplanuid }}</p>
                    <!-- <p class="font-poppins font-semibold text-xs tracking-wider">{{ item.oc_asset_nomenclature
                    }}</p> -->
                    <p class="font-poppins font-normal text-xs tracking-wider">{{
                        datetime(item.oc_maintenanceoperation_date) }}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-center">
                    <div class=" w-full  flex  flex-col">
                        <div class="flex items-center space-x-2">
                            <p class="font-poppins font-semibold text-lg tracking-wider">{{
                                item.oc_maintenanceoperation_name }}
                            </p>
                        </div>
                        <div class="flex space-x-32">
                            <p class="font-poppins font-normal text-xs tracking-wider">{{ item.coding }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between">
                    <p class="font-poppins text-xs tracking-wider flex items-end ">{{
                        item.oc_maintenanceoperation_operator }}</p>
                    <p class="font-poppins font-normal text-xs tracking-wider">{{ item.oc_maintenanceoperation_result }}
                    </p>
                </div>
            </div>
        </div>
        <VueFinalModal v-model="isInfo" :click-to-close="true" class="flex justify-center items-center"
            transition="vfm-fade-in-up">
            <div class="w-80 max-h-80 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out overflow-hidden"
                :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight}px)` : 'translateY(0)' }">
                <div class="py-4 px-4 ">
                    <div class="flex items-center gap-3 pb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                            <path fill="#014268"
                                d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
                        </svg>
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Plus d'infos</p>
                    </div>
                    <div class="overflow-auto max-h-50 rounded p-2">
                        <p class="font-poppins leading-5 font-base"
                            v-html="formatInstructions(plus.oc_maintenanceoperation_comment)"></p>
                    </div>
                    <div class="flex gap-5">
                        <button class="font-normal text-red-500 grow basis-1" @click="isInfo = false">Fermer</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex justify-center items-end"
            transition="vfm-fade-in-up">
            < <div class="bg-white rounded-t-4xl shadow-lg transition-transform duration-300 ease-in-out"
                :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight}px)` : 'translateY(0)' }">
                <div class=" p-2 flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950"></div>
                </div>
                <div class="p-4 pt-0 space-y-4">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" @click="isModalVisible = false"
                            viewBox="0 0 24 24"><!-- Icon from Akar Icons by Arturo Wibawa - https://github.com/artcoholic/akar-icons/blob/master/LICENSE -->
                            <path fill="none" stroke="#0c4a6e" stroke-linecap="round" stroke-width="2"
                                d="M20 20L4 4m16 0L4 20" />
                        </svg>
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Filtre</p>
                    </div>
                    <!-- <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Service et structure"> -->
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Référence inventaire" v-model="oc_maintenanceoperation_maintenanceplanuid">
                    <!-- <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Plan de maintenance"> -->
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Technicien interne" v-model="oc_maintenanceoperation_operator">
                    <select name="" id=""
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2">
                        <option value="">-------</option>
                        <option value="">Révision necessaire</option>
                    </select>
                    <div class="w-[100%] flex space-x-7 ">
                        <div class="relatif flex overflow-hideen items-center justify-end">
                            <input type="date" name="" id="" v-model="oc_maintenanceoperation_date__gte"
                                class="rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2 grow basis-1">
                            <span class="absolute p-1"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                    viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                                    <path fill="#014268"
                                        d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                                </svg></span>
                        </div>
                        <div class="relatif flex overflow-hideen items-center justify-end">
                            <input type="date" name="" id="" v-model="oc_maintenanceoperation_date__lte"
                                class="rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2 grow basis-1">
                            <span class="absolute p-1"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                    viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                                    <path fill="#014268"
                                        d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                                </svg></span>
                        </div>
                    </div>
                    <div class="flex gap-5 ">
                        <button class="py-3 rounded-lg bg-sky-950 m-0 font-bold text-white grow basis-1">Vider</button>
                        <button class="py-3 rounded-lg bg-sky-950 font-bold text-white grow basis-1"
                            @click="FiltrerMaintenanceOperations">Recherche</button>
                    </div>
                </div>
                <div v-if="hasError"
                    class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 rounded mb-4"
                    role="alert">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v2m0 4h.01M4.93 4.93a10 10 0 0114.14 0 10 10 0 010 14.14 10 10 0 01-14.14 0 10 10 0 010-14.14z">
                        </path>
                    </svg>
                    <p>Une erreur est survenue</p>
                </div>
    </div>
    </VueFinalModal>
    </div>
    <div class="w-screen" v-else>
        <div class="w-screen flex items-center justify-center gap-[10%] my-8">
            <button class="fixed left-4 p-2 bg-sky-900 rounded-xl flex justify-center items-center space-x-2 z-50"
                @click="showNewView = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                    <path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m15 18l-6-6l6-6" />
                </svg>
            </button>
            <button class="fixed right-4 p-2 bg-sky-900 rounded-xl flex justify-center items-center space-x-2 z-50"
                @click="handleNewItem">
                <svg width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.1665 27.7084H11.6665M29.1665 17.5H5.83318M29.1665 7.29171H17.4998" stroke="white"
                        stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
        <div class="overflow-auto p-4">
            <div class="p-4 pt-0 space-y-4">
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Opération de maintenance</p>
                </div>
                <div class="">
                    <p class="m-0 ">Référence inventaire</p>
                    <div class="flex ">
                        <p class="m-0 font-semibold">1.32479</p>
                    </div>
                </div>
                <div class="">
                    <p class="m-0 ">Date plan comptable</p>
                    <div class="flex ">
                        <p class="ml-2 font-semibold">1-02-2019</p>
                    </div>
                </div>
                <input type="text"
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Plan de maintenance">
                <input type="text"
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Prestataire externe">
                <input type="date"
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2 mb-1"
                    placeholder="Technicien interne">
                <p class="m-0">Période d'intervention</p>
                <div class="w-[100%]  flex space-x-7 ">
                    <input type="date"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="">
                    <input type="date"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="">
                </div>
                <select name="" id=""
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2">
                    <option value="">Type</option>
                    <option value="">Maintenance préventive</option>
                </select>
                <textarea v-model="commentaire" rows="6" placeholder="Écrivez votre commentaire ici..."
                    class="w-full p-3 border-2 border-sky-900 rounded-lg resize-y  focus:border-3 focus:border-sky-900 focus:outline-none   text-gray-800" />

                <input type="date"
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Fournisseur">
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Coût</p>
                </div>
                <div class="w-[100%]  flex space-x-7 ">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Transport">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Prestataire">
                </div>
                <div class="w-[100%]  flex space-x-7 ">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Consommable">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Autre">
                </div>
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Info récentes</p>
                </div>
                <div class="flex gap-5 ">
                    <button class="py-3 rounded-lg bg-sky-950 font-bold text-white grow basis-1">Sauvegarder</button>
                </div>
            </div>
        </div>
    </div>
    </Base>
</template>


<script>
import Base from '../Base.vue'
import axios from 'axios'
import { VueFinalModal } from 'vue-final-modal'
import { Keyboard } from '@capacitor/keyboard'

export default {
    components: {
        VueFinalModal, Base
    },
    props: {
        nom: {
            type: [String],
            required: false
        }
    },
    computed: {
        filteredItems() {
            if (!this.nom) return this.items
            return this.items.filter(item => item.nom == this.nom)
        }
    },
    data() {
        return {
            isModalVisible: false,
            showNewView: false,
            isKeyboardVisible: false,
            keyboardHeight: 0,
            items: [],
            isInfo: false,
            hasError: false,
            oc_maintenanceoperation_maintenanceplanuid: "",
            oc_maintenanceoperation_date__gte: "",
            oc_maintenanceoperation_date__lte: "",
            oc_maintenanceoperation_operator: "",
        }
    },
    methods: {
        async FiltrerMaintenanceOperations() {
            try {
                const params = {
                    oc_maintenanceoperation_maintenanceplanuid: this.oc_maintenanceoperation_maintenanceplanuid || '',
                    oc_maintenanceoperation_date__gte: this.oc_maintenanceoperation_date__gte || '',
                    oc_maintenanceoperation_date__lte: this.oc_maintenanceoperation_date__lte || '',
                    oc_maintenanceoperation_operator: this.oc_maintenanceoperation_operator || '',
                };

                const response = await axios.get("/oc_maintenanceoperations/", { params });
                this.items = response.data.results;
                this.isModalVisible = false
            } catch (error) {
                console.error("Erreur lors du filtrage des opérations de maintenance :", error);
                this.displayErrorOrRefreshToken(error, this.FiltrerMaintenanceOperations);
            }
        },
        PlusInfo(info) {
            this.isInfo = true
            this.plus = info
            console.log(this.plus)
        },
        getOperation() {
            console.log('bonjour')
            axios.get(`/oc_maintenanceoperations/`)
                .then((reponse) => {
                    this.items = reponse.data.results
                    // this.hasError = true;
                    this.$store.state.Operation = reponse.data.results
                    console.log(this.items)
                }).catch((error) => {
                    console.error("Erreur lors de la récupération de l'inventaire :", error);
                    this.hasError = true;
                });
        },
        handleNewItem() {
            this.showNewView = true
        },
        returnToMainView() {
            this.showNewView = false
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
    mounted() {
        this.windowHeight = window.innerHeight;
        window.addEventListener('resize', this.handleResize);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
        if (this.$store.state.Operation.length === 0) {
            this.getOperation()
        } else {
            this.items = this.$store.state.Operation
            console.log(this.$store.state.Operation)
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        Keyboard.removeAllListeners();
    },
}
</script>



<style scoped></style>