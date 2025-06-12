<template>
    <Base #slot4>
    <div class="w-screen h-full overflow-auto " v-if="!showNewView">
        <div class="w-screen overflow-hidden flex items-center justify-center gap-[10%] my-2 mb-5 pb-3">
            <button class="custom-box custom-left" @click="isModalVisible = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
            <button class="custom-box custom-right" @click="handleNewItem"
                v-if="$store.state.user.default_page === 'maintenance' & this.$store.state.code_plan[0]?.oc_maintenanceplan_assetuid">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32"
                    viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE -->
                    <path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7-7v14" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Nouveau</p>
            </button>
        </div>
        <div class="toast flex justify-center ">
            <div class="w-80 bg-black/80 text-white text-[9pt] rounded-lg p-3 flex justify-between items-center"
                v-if="postalert">
                <p>⚠️ Erreur lors de l'envoi offline</p>
                <button class="bg-sky-950 p-2 rounnded-xl" @click="this.postalert = false">OK</button>
            </div>
        </div>
        <div class="w-screen relative flex justify-center my-2" v-if="$store.state.user.default_page === 'maintenance'">
            <button
                class="w-12 h-12 flex justify-center items-center bg-sky-900/90 rounded-xl fixed bottom-30 right-6 shadow-[1px_1px_5px_1px_rgba(0,0,0,0.5)]"
                @click="this.$router.go('/Operation')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path fill="#ffffff"
                        d="M5.53 17.506q-.978-1.142-1.504-2.558T3.5 12q0-3.616 2.664-6.058T12.5 3.5V2l3.673 2.75L12.5 7.5V6Q9.86 6 7.93 7.718T6 12q0 1.13.399 2.15t1.13 1.846zM11.5 22l-3.673-2.75L11.5 16.5V18q2.64 0 4.57-1.718T18 12q0-1.13-.399-2.16q-.399-1.028-1.13-1.855l1.998-1.51q.979 1.142 1.505 2.558T20.5 12q0 3.616-2.664 6.058T11.5 20.5z" />
                </svg>
            </button>
        </div>
        <div class="w-screen flex flex-col items-center space-y-3 mb-4">
            <div v-for="item in filteredItems" :key="item.oc_maintenanceoperation_objectid"
                class="w-[95%] rounded-2xl bg-sky-100 flex flex-col text-sky-900 p-2" @click="PlusInfo(item)">
                <div class="w-full flex items-center justify-between">
                    <p class="font-poppins font-semibold text-sm tracking-wider">{{
                        item.oc_maintenanceoperation_maintenanceplanuid }}</p>
                    <p class="font-poppins font-normal text-xs tracking-wider">{{
                        datetime(item.oc_maintenanceoperation_historydate) }}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-center">
                    <div class=" w-full  flex  flex-col">
                        <div class="flex items-center space-x-2">
                            <p class="font-poppins text-[11px] tracking-wider description">{{
                                item.oc_maintenanceoperation_comment || `(Aucun commentaire)` }}
                            </p>
                        </div>
                        <div class="flex space-x-32">
                            <p class="font-poppins font-normal text-xs tracking-wider ">{{ item.coding }}</p>
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
            <p class="text-sky-900 text-[12px]" v-if="$store.state.code_inventaire.oc_asset_description">Aucune opération</p>
            <!-- Sinon, si items est vide ET qu'il n'y a pas de description -->
            <p class="text-sky-900 text-[12px]"v-else-if="items.length === 0 && !$store.state.code_inventaire.oc_asset_description">veuillez tout d'abord choisir un plan de maintenance
            </p>
        </div>
        <VueFinalModal v-model="isInfo" :click-to-close="true" class="flex justify-center items-center"
            transition="vfm-fade-in-up">
            <div class="w-80 max-h-80 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out overflow-hidden"
                :style="{ bottom: isKeyboardVisible ? `translateY${keyboardHeight}` : 'translateY(0)' }">
                <div class="py-4 px-4 ">
                    <div class="flex items-center gap-3 pb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                            <path fill="#014268"
                                d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
                        </svg>
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Plus d'infos</p>
                    </div>
                    <div class="overflow-auto max-h-90 rounded p-2 py-[12px]">
                        <p class="font-poppins leading-5 font-base"
                            v-html="formatInstructions(plus.oc_maintenanceoperation_comment)"></p>
                    </div>
                    <div class="flex justify-center px-4 pt-3 pb-0 gap-9">
                        <button
                            class="font-normal text-slate-300 py-1 active:text-slate-500  active:bg-sky-500/30 active:border-1 active:border-sky-500/30  rounded-md grow basis-1 max-w-30"
                            @click="isInfo = false">Fermer</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class=" !w-full flex flex-col justify-end"
            transition="vfm-fade-in-up">
            <div class="w-full bg-white rounded-t-4xl shadow-lg transition-transform duration-300 ease-in-out"
                :style="{ bottom: isKeyboardVisible ? `translateY${keyboardHeight}` : 'translateY(0)' }">
                <div class=" p-2 flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950" @click="isModalVisible = false"></div>
                </div>
                <div class="px-2 pt-0 space-y-2">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" @click="isModalVisible = false"
                            viewBox="0 0 24 24">
                            <path fill="none" stroke="#0c4a6e" stroke-linecap="round" stroke-width="2"
                                d="M20 20L4 4m16 0L4 20" />
                        </svg>
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Filtre</p>
                    </div>
                    <input type="text" class="w-[100%] " placeholder="Nomanclature"
                        v-model="oc_maintenanceoperation_maintenanceplanuid">
                    <input type="text" v-model="oc_maintenanceoperation_operator" class="w-[100%] "
                        placeholder="Opérateur">
                    <select name="" id="" class="w-[100%] " v-model="oc_maintenanceoperation_result__icontains">
                        <option value="">Frequency</option>
                        <option value="defect">Défectueux</option>
                        <option value="ok">ok</option>
                        <option value="revsion">Révision nécessaire</option>
                    </select>
                    <div class="w-[100%]  flex justify-between ">
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" v-model="oc_maintenanceoperation_date__gte"
                                class="relative w-full rounded-lg  py-1 " placeholder="code">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                                viewBox="0 0 24 24">
                                <path fill="#014268"
                                    d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                            </svg>
                        </div>
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" v-model="oc_maintenanceoperation_date__lte"
                                class="relative w-full rounded-lg  py-1 " placeholder="code">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                                viewBox="0 0 24 24">
                                <path fill="#014268"
                                    d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex gap-5 ">
                        <button
                            class="py-1.5 my-1 rounded-lg border-1 border-[#014268] m-0 font-bold text-[#014268] active:text-[#fff] active:bg-[#014268] grow basis-1">Vider</button>
                        <button
                            class="py-1.5 my-1 rounded-lg bg-[#014268] font-bold text-white grow basis-1 active:text-[#014268] active:bg-[#ffff] active:border-1 active:border-[#014268]"
                            @click="FiltrerMaintenanceOperations">Recherche</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>
    </div>
    <div class="w-screen" v-else>
        <div class="w-screen flex items-center justify-center gap-[10%] my-4">
            <button class="fixed left-4 p-1 bg-sky-900 rounded-xl flex justify-center items-center space-x-2 z-50"
                @click="showNewView = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m15 18l-6-6l6-6" />
                </svg>
            </button>
        </div>
        <div class="overflow-auto">
            <form class="px-3 pt-0 space-y-3">
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-[24px] text-sky-900  font-light">Opération de maintenance</p>
                </div>
                <div class="">
                    <p class="">Référence inventaire</p>
                    <div class="flex ">
                        <!-- <p class="ml-2 font-semibold">{{ this.$store.state.code_plan.oc_maintenanceplan_assetuid }}</p> -->
                        <input type="text" name="" id="" v-model="nameplan" placeholder="Référence inventaire"
                            class="w-full p-2 mt-2" disabled>
                    </div>
                </div>
                <input type="text" class="w-full   p-2" placeholder="Supplier"
                    v-model="oc_maintenanceoperation_supplier">

                <select name="" id="" class="w-full  p-2" v-model="oc_maintenanceoperation_result">
                    <option value="">Resultat</option>
                    <option value="defect">Défectueux</option>
                    <option value="ok">ok</option>
                    <option value="revsion">Révision nécessaire</option>
                </select>
                <textarea v-model="oc_maintenanceoperation_comment" rows="6"
                    placeholder="Écrivez votre commentaire ici..." class="w-full p-3" />
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-[24px] text-sky-900  font-light">Coût</p>
                </div>
                <input type="number" v-model="oc_maintenanceoperation_comment1" class="w-full  py-2 pl-3"
                    placeholder="Transport">
                <input type="number" v-model="oc_maintenanceoperation_comment5" class="w-full  py-2 pl-3"
                    placeholder="Préstataire">
                <input type="number" v-model="oc_maintenanceoperation_comment2" class="w-full  py-2 pl-3"
                    placeholder="Consommable">
                <input type="number" v-model="oc_maintenanceoperation_comment3" class="w-full  py-2 pl-3"
                    placeholder="Autre">
                <div class="flex gap-5 my-3 mb-15">
                    <button class="py-2 rounded-lg bg-sky-950 font-bold text-white grow basis-1" @click="putOperation"
                        type="submit">Enregistrer</button>
                    <button class="py-2 rounded-lg bg-sky-950 font-bold text-white grow basis-1" @click="postPlan"
                        type="submit">Sauvegarder</button>
                </div>
            </form>
        </div>

    </div>
    </Base>
</template>


<script>
import Base from '../Base.vue'
import axios from 'axios'
import { VueFinalModal } from 'vue-final-modal'
import { Keyboard } from '@capacitor/keyboard'
import { addOfflineRequest, getAllRequests, deleteRequest } from '../../indexDb';

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
            const code = this.$store.state.code_plan[0]?.oc_maintenanceplan_assetuid
            if (!code) {
                return this.items
            }
            return this.items.filter(item =>
                item.oc_maintenanceoperation_maintenanceplanuid = code
            )
        },
        // equipementInventaire() {
        //     return this.$store.state.equipements;
        // }
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
            previousOperationSnapshot: null,
            oc_maintenanceoperation_supplier: '',
            oc_maintenanceoperation_result: '',
            oc_maintenanceoperation_comment1: '',
            oc_maintenanceoperation_comment2: '',
            oc_maintenanceoperation_comment3: '',
            oc_maintenanceoperation_comment5: '',
            oc_maintenanceoperation_comment: '',
            refe: this.$store.state.code_plan[0]?.oc_maintenanceplan_assetuid,
            isReallyOnline: false,
            nameplan: this.$store.state.code_inventaire.oc_asset_description,
            postalert: false,
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
        Modifier(info) {
            this.showNewView = true;
            // this.plus = this.plus.map(({ __local, ...rest }) => rest)
            this.refe = info.refe
            this.oc_maintenanceoperation_result = info.oc_maintenanceoperation_result;
            this.oc_maintenanceoperation_comment = info.oc_maintenanceoperation_comment;
            this.oc_maintenanceoperation_comment1 = info.oc_maintenanceoperation_comment1
            this.oc_maintenanceoperation_comment2 = info.oc_maintenanceoperation_comment2
            this.oc_maintenanceoperation_comment3 = info.oc_maintenanceoperation_comment3
            this.oc_maintenanceoperation_comment5 = info.oc_maintenanceoperation_comment5

        },
        PlusInfo(info) {
            if (info.__local) {
                this.Modifier(info)
            } else {
                this.selectInfo(info)
            }
        },
        putOperation() {

            const doc = {
                'oc_maintenanceoperation_maintenanceplanuid': this.refe,
                'oc_maintenanceoperation_operator': this.$store.state.code_plan.oc_maintenanceplan_operator,
                'oc_maintenanceoperation_result': this.oc_maintenanceoperation_result,
                'oc_maintenanceoperation_comment': this.oc_maintenanceoperation_comment,
                'oc_maintenanceoperation_comment1': this.oc_maintenanceoperation_comment1,
                'oc_maintenanceoperation_comment2': this.oc_maintenanceoperation_comment2,
                'oc_maintenanceoperation_comment3': this.oc_maintenanceoperation_comment3,
                'oc_maintenanceoperation_comment5': this.oc_maintenanceoperation_comment5,
            };
            let existing = JSON.parse(window.localStorage.getItem('putOperation') || '[]');
            if (!Array.isArray(existing)) {
                existing = [];
            }
            const index = existing.findIndex(
                item => item.oc_maintenanceplan_assetuid === doc.oc_maintenanceplan_assetuid
            );
            if (index !== -1) {
                existing[index] = doc;
            } else {
                existing.unshift(doc);
            }
            window.localStorage.setItem('putOperation', JSON.stringify(existing));
            it
        },
        getOperation() {
            console.log('bonjour')
            axios.get(`/oc_maintenanceoperations/?oc_maintenanceoperation_maintenanceplanuid=${this.$store.state.code_plan[0]?.oc_maintenanceplan_assetuid}`)
                .then((reponse) => {
                    this.items = reponse.data.results
                    this.$store.state.Operation = reponse.data.results
                    console.log(this.items)
                    window.localStorage.setItem('operation', JSON.stringify(reponse.data.results))

                }).catch((error) => {
                    console.error("Erreur lors de la récupération de l'inventaire :", error);
                    this.hasError = true;
                    this.$store.state.Operation = JSON.parse(window.localStorage.getItem('operation'))
                    getAllRequests().then((reponse) => {
                        console.log(reponse)
                        for (let item of reponse) {
                            if (item.url == "/oc_maintenanceoperations/")
                                this.items.unshift(item.data)
                        }
                    })
                    let planLocal = JSON.parse(window.localStorage.getItem('putOperation'))
                    planLocal = planLocal.map(item => ({ ...item, __local: true }))
                    this.items.unshift(...planLocal)
                    console.log(this.items)
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
            this.isKeyboardVisible = true;
            this.keyboardHeight = event.keyboardHeight;
        },
        handleKeyboardHide() {
            this.isKeyboardVisible = false;
            this.keyboardHeight = 0;
        },
        async postPlan() {
            window.localStorage.removeItem('putOperation')
            const data = {
                'oc_maintenanceoperation_maintenanceplanuid': this.refe,
                'oc_maintenanceoperation_operator': this.$store.state.code_plan.oc_maintenanceplan_operator,
                'oc_maintenanceoperation_result': this.oc_maintenanceoperation_result,
                'oc_maintenanceoperation_comment': this.oc_maintenanceoperation_comment,
                'oc_maintenanceoperation_comment1': this.oc_maintenanceoperation_comment1,
                'oc_maintenanceoperation_comment2': this.oc_maintenanceoperation_comment2,
                'oc_maintenanceoperation_comment3': this.oc_maintenanceoperation_comment3,
                'oc_maintenanceoperation_comment5': this.oc_maintenanceoperation_comment5,
            };

            const url = '/oc_maintenanceoperations/';

            console.log("CLICKED");
            if (!this.isReallyOnline) {
                await addOfflineRequest({ method: 'post', url, data });
                this.items.unshift(data);
                this.showNewView = false;
                console.warn("📦 Requête enregistrée dans IndexedDB (offline).");
                return;
            }
            try {
                const response = await axios.post(url, data);
                this.items.push(response.data);
                this.showNewView = false;
            } catch (error) {
                console.error("❌ Erreur lors de l'envoi :", error);
                this.hasError = true;
            }
        },

        async resendOfflineRequests() {
            const requests = await getAllRequests();

            for (const req of requests) {
                try {
                    await axios.post(req.url, req.data);
                    await deleteRequest(req.id);
                    console.log('✅ Requête offline envoyée avec succès.');
                    this.getOperation()
                } catch (err) {
                    console.error('⚠️ Erreur lors de l’envoi offline :', err);
                    this.activerpostalert()
                }
            }
        },
        activerpostalert() {
            this.postalert = true;
            setTimeout(() => {
                this.postalert = false;
            }, 3000);
        },
        async verifyConnection() {
            try {
                const res = await fetch('https://gmao.amidev.bi/api/', {
                    method: 'GET',
                    cache: 'no-store',
                });
                this.isReallyOnline = res.ok;
                console.log('🌐 Connexion réelle :', res.ok);

                if (res.ok) {
                    this.resendOfflineRequests();
                }
            } catch (err) {
                console.warn('🚫 Connexion réelle impossible :', err);
                this.isReallyOnline = false;
            }
        },

        monitorNetworkStatus() {
            window.addEventListener('online', this.verifyConnection);
            window.addEventListener('offline', () => {
                this.isReallyOnline = false;
                console.warn('📴 Mode hors-ligne détecté.');
            });

            this.verifyConnection(); // Vérifie dès le démarrage
        },
    },
    mounted() {
        this.windowHeight = window.innerHeight;
        window.addEventListener('resize', this.handleResize);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
        window.addEventListener('online', this.resendOfflineRequests);
        this.monitorNetworkStatus();
        this.getOperation()
    },
    beforeUnmount() {
        Keyboard.removeAllListeners();
        window.removeEventListener('online', this.resendOfflineRequests);

    },

}
</script>



<style scoped></style>