<template>
    <Base #slot3>
    <div class="h-full mb-4 overflow-auto" v-if="!showNewView">
        <div class="flex items-center justify-center  my-2 mb-3 pb-3">
            <button @click="isModalVisible = true" class="custom-box custom-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
            <button class="custom-box custom-right" @click="handleNewItem"
                v-if="$store.state.user.default_page === 'maintenance'">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
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
                @click="this.$router.go('/plan')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="#ffffff"
                        d="M5.53 17.506q-.978-1.142-1.504-2.558T3.5 12q0-3.616 2.664-6.058T12.5 3.5V2l3.673 2.75L12.5 7.5V6Q9.86 6 7.93 7.718T6 12q0 1.13.399 2.15t1.13 1.846zM11.5 22l-3.673-2.75L11.5 16.5V18q2.64 0 4.57-1.718T18 12q0-1.13-.399-2.16q-.399-1.028-1.13-1.855l1.998-1.51q.979 1.142 1.505 2.558T20.5 12q0 3.616-2.664 6.058T11.5 20.5z" />
                </svg>
            </button>
            <loading v-if="loader" class="w-full mb-3" />
        </div>
        <div class="toast flex justify-center ">
            <div class="w-80 bg-black/80 text-white text-[8pt] rounded-lg p-3 flex justify-between items-center"
                v-if="planAlert">
                <p>choisis un équipement ou infrastructure</p>
                <button class="bg-sky-950 p-2 rounnded-xl" @click="this.planAlert = false">OK</button>
            </div>
        </div>
        <div class="w-screen flex flex-col items-center space-y-3 mb-4">
            <div v-for="item in filteredItems" :key="item.oc_maintenanceplan_objectid"
                class="w-[95%] rounded-2xl bg-sky-100  flex flex-col text-sky-900 p-2" @click="PlusInfo(item)"
                :class="{ 'opacity-80': item.mode == 'offline' }">
                <div class="w-full flex items-center justify-between">
                    <p v-if="!$store.state.code_inventaire.oc_asset_description"
                        class="font-poppins font-semibold text-sm tracking-wider">{{ item.oc_maintenanceplan_assetuid }}
                    </p>
                    <p v-else class="font-poppins font-semibold text-[10px] tracking-wider">{{
                        formatInstructions(this.$store.state.code_inventaire.oc_asset_description) }}</p>
                    <p class="font-poppins font-normal text-xs tracking-wider">{{
                        datetime(item.oc_maintenanceplan_updatetime) }}
                    </p>
                </div>
                <div class="w-full flex flex-col items-start justify-center">
                    <div class=" w-full  flex  flex-col">
                        <div class="flex items-center justify-between">
                            <p class="font-poppins font-semibold text-[16px] tracking-wider">{{
                                item.oc_maintenanceplan_name }}</p>

                            <p class="font-poppins font-semibold text-xs tracking-wider"> <svg
                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
                                </svg></p>
                        </div>
                        <div class="flex justify-between">
                            <p class="font-poppins text-[10px] tracking-wider description">{{
                                item.oc_maintenanceplan_instructions || `(Aucune instruction)` }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between font-poppins font-normal text-[12px]">
                    <p class="font-poppins">{{ item.oc_maintenanceplan_operator }}</p>
                    <p class="font-poppins">{{ datetime(item.oc_maintenanceplan_historydate) }}</p>
                </div>
            </div>
            <div v-if="this.items.length === 0 && this.loader === false" class="">
                <p class="text-sky-900 text-[12px]">Aucun plans</p>
            </div>
            <div v-if="this.loader" class="">
                <p class="text-sky-900 text-[12px]">Téléchargement en cours .....</p>
            </div>
        </div>
        <VueFinalModal v-model="isInfo" :click-to-close="true" class="flex justify-center items-center"
            transition="vfm-fade-in-up">
            <div class="w-80 max-h-full bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out overflow-hidden"
                :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight}px)` : 'translateY(0)' }">
                <div class="py-4 px-4 ">
                    <div class="flex items-center pb-2 gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                            <path fill="#014268"
                                d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
                        </svg>
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Plus d'infos</p>
                    </div>
                    <div class="overflow-auto max-h-90 rounded p-2 py-[12px]">
                        <p class="font-poppins leading-5 font-base"
                            v-html="formatInstructions(plus.oc_maintenanceplan_instructions)"></p>
                    </div>
                    <div class="flex justify-between px-4 pt-3 pb-0 gap-9">
                        <button
                            class="font-normal py-1 text-slate-500 active:text-sky-800 active:bg-sky-500/30 active:border-1 active:border-sky-500/30  rounded-md grow basis-1"
                            @click="isInfo = false">Fermer</button>
                        <button
                            class="font-normal py-1 text-white bg-sky-800  rounded-md active:bg-sky-500/30  active:border-sky-800 active:text-sky-800 grow basis-1"
                            @click="selectItem(items)">Opération</button>
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
                    <!-- <input type="text"
                    class="w-[100%] "
                    placeholder="Nomanclature" v-model="nomenclature"> -->
                    <input type="text" v-model="oc_maintenanceplan_operator" class="w-[100%] " placeholder="Opérateur">
                    <select name="" id="" class="w-[100%] " v-model="oc_maintenanceplan_type">
                        <option value="">Types</option>
                        <option value="1">Contrôle</option>
                        <option value="2">Maintenance</option>
                        <option value="3">Curatif</option>
                        <option value="99">Autre</option>
                    </select>
                    <div class="w-[100%]  flex justify-between ">
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" v-model="oc_maintenanceplan_historydate__gte"
                                class="relative w-full rounded-lg  py-1 " placeholder="code">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                                viewBox="0 0 24 24">
                                <path fill="#014268"
                                    d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                            </svg>
                        </div>
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" v-model="oc_maintenanceplan_historydate__lte"
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
                            class="py-1.5 my-1 rounded-lg border-1 border-[#014268] m-0 font-bold text-[#014268] active:text-[#fff] active:bg-[#014268] grow basis-1"
                            @click="vide">Vider</button>
                        <button
                            class="py-1.5 my-1 rounded-lg bg-[#014268] font-bold text-white grow basis-1 active:text-[#014268] active:bg-[#ffff] active:border-1 active:border-[#014268]"
                            @click="FiltrerMaintenancePlan">Recherche</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>

    </div>
    <div class="" v-else>
        <div class="w-screen flex items-center justify-center gap-[10%] my-4 ">
            <button class="fixed left-4 p-1 bg-sky-900 rounded-xl flex justify-center items-center space-x-2 z-50"
                @click="showNewView = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m15 18l-6-6l6-6" />
                </svg>
            </button>
        </div>
        <div class="overflow-auto ">
            <form class="px-3 pt-0 space-y-3 " @submit.prevent="handleSubmit">
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-[24px] text-sky-900  font-light">Plan de maintenance</p>
                </div>
                <input type="text" :value="assetid + ' ' + nameplan" name="" id="" class="w-[100%]" disabled>
                <input type="text" v-model="nom" class="w-full  py-2 pl-3" placeholder="Nom du plan" required>
                <select name="" id="" class="w-full  p-2" v-model="type" required>
                    <option value="">Types</option>
                    <option value="1">Contrôle</option>
                    <option value="2">Maintenance</option>
                    <option value="3">Curatif</option>
                    <option value="99">Autre</option> 1.6485
                </select>
                <textarea v-model="commentaire" rows="6" placeholder="Écrivez votre commentaire ici..."
                    class="w-full p-3 text-gray-800" required />
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-[24px] text-sky-900  font-light">Coût</p>
                </div>
                <input type="number" v-model="transport" class="w-full  py-2 pl-3" placeholder="Transport">
                <input type="number" v-model="prestataire" class="w-full  py-2 pl-3" placeholder="Préstataire">
                <input type="number" v-model="consommable" class="w-full  py-2 pl-3" placeholder="Consommable">
                <input type="number" v-model="Autre" class="w-full  py-2 pl-3" placeholder="Autre">
                <div class="flex gap-5 my-3 mb-15">
                    <button class="py-2 rounded-lg bg-sky-950 font-bold text-white grow basis-1"
                        @click="submitType = 'put'" type="submit">Enregistrer</button>
                    <button class="py-2 rounded-lg bg-sky-950 font-bold text-white grow basis-1"
                        @click="submitType = 'post'" type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    </div>
    </Base>
</template>

<script>
import Base from '../Base.vue';
import axios from 'axios'
import { VueFinalModal } from 'vue-final-modal'
import { Keyboard } from '@capacitor/keyboard'
import { addOfflineRequest, getAllRequests, deleteRequest } from '../../indexDb';
import loading from '../../components/loading.vue'
export default {
    components: {
        VueFinalModal, Base, loading
    },
    props: {
        equipementId: {
            type: [String, Number],
            required: false
        }
    },
    computed: {
        filteredItems() {
            const code = this.$store.state.code_inventaire.oc_asset_code
            if (!code) {
                return this.items
            }
            return this.items.filter(item =>
                item.oc_maintenanceplan_assetuid === code
            )
        },
        onLineStatus() {
            return navigator.onLine
        }
    },
    data() {
        return {
            isModalVisible: false,
            showNewView: false,
            Autre: '',
            consommable: '',
            prestataire: '',
            transport: '',
            nom: '',
            type: '',
            commentaire: '',
            plan: [],
            isKeyboardVisible: false,
            keyboardHeight: 0,
            items: [],
            isInfo: false,
            hasError: false,
            oc_maintenanceplan_operator: '',
            oc_maintenanceplan_type: '',
            oc_maintenanceplan_historydate__gte: '',
            oc_maintenanceplan_historydate__lte: '',
            oc_maintenanceplan_historydate: null,
            isReallyOnline: false,
            assetid: this.$store.state.code_inventaire.oc_asset_code,
            planAlert: false,
            nameplan: this.$store.state.code_inventaire.oc_asset_description,
            serverid: '1',
            postalert: false,
            submitType: '',
            loader: false
        }
    },
    methods: {
        vide() {
            this.oc_maintenanceplan_operator = '';
            this.oc_maintenanceplan_type = '';
            this.oc_maintenanceplan_historydate__gte = '';
            this.oc_maintenanceplan_historydate__lte = '';
        },
        handleSubmit() {
            if (this.submitType === 'put') {
                this.putPlan();
            } else if (this.submitType === 'post') {
                this.postPlan();
            }
        },
        async FiltrerMaintenancePlan() {
            this.loader = true
            try {
                const params = {
                    oc_maintenanceplan_assetuid: this.oc_maintenanceplan_assetuid || '',
                    oc_maintenanceplan_historydate__gte: this.oc_maintenanceplan_historydate__gte || '',
                    oc_maintenanceplan_historydate__lte: this.oc_maintenanceplan_historydate__lte || '',
                    oc_maintenanceplan_operator: this.oc_maintenanceplan_operator || '',
                    oc_maintenanceplan_type: this.oc_maintenanceplan_type || '',
                };

                const response = await axios.get("/oc_maintenanceplanshistory/", { params });
                this.items = response.data.results;
                this.isModalVisible = false
                this.loader = false
            } catch (error) {
                console.error("Erreur lors du filtrage des opérations de maintenance :", error);
                this.displayErrorOrRefreshToken(error, this.FiltrerMaintenanceOperations);
                this.loader = false
            }
        },
        Modifier(plus) {
            this.showNewView = true;
            // this.plus = this.plus.map(({ __local, ...rest }) => rest)
            this.oc_maintenanceplan_type = plus.oc_maintenanceplan_type;
            this.nom = plus.oc_maintenanceplan_name;
            this.commentaire = plus.oc_maintenanceplan_instructions
            this.assetid = plus.oc_maintenanceplan_assetuid;
            this.Autre = plus.oc_maintenanceplan_comment4
            this.consommable = plus.oc_maintenanceplan_comment1
            this.prestataire = plus.oc_maintenanceplan_comment3
            this.transport = plus.oc_maintenanceplan_comment2
            this.type = plus.oc_maintenanceplan_type
            this.oc_maintenanceplan_historydate = plus.oc_maintenanceplan_historydate

        },
        PlusInfo(info) {
            if (info.mode == 'offline') {
                this.Modifier(info)
            } else {
                this.selectInfo(info)
            }
        },
        selectInfo(info) {
            this.isInfo = true
            this.plus = info
            console.log(this.plus)
        },
        selectItem(plus) {
            console.log(this.plus)
            this.$store.state.code_plan = this.plus.oc_maintenanceplan_assetuid
            console.log(this.$store.state.code_plan)
            this.$router.push('/Operation')
        },
        handleNewItem() {
            if (this.$store.state.code_inventaire.oc_asset_code) {
                this.showNewView = true
            } else {
                this.planAlert = true
                setTimeout(() => {
                    this.planAlert = false;
                }, 3000);
            }
        },
        returnToMainView() {
            this.showNewView = false
        },
        replaceInStorage(doc) {
            let existing = JSON.parse(window.localStorage.getItem('waiting_plans') || '[]');
            const index = existing.findIndex(
                item => item.oc_maintenanceplan_historydate === this.oc_maintenanceplan_historydate
            );
            if (index !== -1) {
                existing[index] = doc;
            } else {
                doc.oc_maintenanceplan_historydate = new Date().toISOString()
                existing.unshift(doc);
            }
            window.localStorage.setItem('waiting_plans', JSON.stringify(existing));
        },
        replaceInListed(doc) {
            const index = this.items.findIndex(
                item => item.oc_maintenanceplan_historydate === this.oc_maintenanceplan_historydate
            );
            if (index !== -1) {
                this.items[index] = doc;
            } else {
                this.items.unshift(doc);
            }
        },
        putPlan() {
            const doc = {
                oc_maintenanceplan_assetuid: this.assetid,
                oc_maintenanceplan_operator: this.$store.state.user.fullname,
                oc_maintenanceplan_comment4: this.Autre,
                oc_maintenanceplan_comment1: this.consommable,
                oc_maintenanceplan_comment3: this.prestataire,
                oc_maintenanceplan_comment2: this.transport,
                oc_maintenanceplan_name: this.nom,
                oc_maintenanceplan_type: this.type,
                oc_maintenanceplan_instructions: this.commentaire,
                mode: 'offline',
            };
            this.replaceInListed(doc);
            this.replaceInStorage(doc);
            this.showNewView = false
        },
        async postPlan() {
            this.loader = true
            let existing = JSON.parse(window.localStorage.getItem('waiting_plans') || '[]');
            existing = existing.filter(x => x.oc_maintenanceplan_historydate != this.oc_maintenanceplan_historydate)
            this.items = this.items.filter(x => x.oc_maintenanceplan_historydate != this.oc_maintenanceplan_historydate)
            window.localStorage.setItem('waiting_plans', JSON.stringify(existing));
            const data = {
                oc_maintenanceplan_assetuid: `${this.assetid}`,
                oc_maintenanceplan_serverid: this.serverid,
                oc_maintenanceplan_operator: this.$store.state.user.fullname,
                oc_maintenanceplan_comment4: this.Autre,
                oc_maintenanceplan_comment1: this.consommable,
                oc_maintenanceplan_comment3: this.prestataire,
                oc_maintenanceplan_comment2: this.transport,
                oc_maintenanceplan_name: this.nom,
                oc_maintenanceplan_type: this.type,
                oc_maintenanceplan_instructions: this.commentaire,
                oc_maintenanceplan_historydate: this.oc_maintenanceplan_historydate
            };
            const url = 'https://gmao.amidev.bi/api/oc_maintenanceplanshistory/';

            if (!this.isReallyOnline) {
                await addOfflineRequest({ method: 'post', url, data });
                this.items.unshift(data);
                this.showNewView = false;
                this.loader = false
                return;
            } else {
                try {
                    const response = await axios.post(url, data);
                    this.items.unshift(response.data);
                    this.showNewView = false;
                    this.loader = false
                } catch (error) {
                    console.error("Erreur lors de l'envoi :", error);
                    this.hasError = true;
                }
            }
        },
        async resendOfflineRequests() {
            const requests = await getAllRequests();

            for (const req of requests) {
                try {
                    console.warn('📦 Tentative d’envoi :', req); // Tout le contenu
                    console.warn('🕵️ UID utilisé :', req.data?.oc_maintenanceplan_assetuid);
                    await axios.post(req.url, req.data);
                    await deleteRequest(req.id);
                    this.getPlan()
                } catch (error) {
                    console.error('❌ Erreur lors de l’envoi offline :', error);
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
        getPlan() {
            this.loader = true
            this.monitorNetworkStatus()
            let planLocal = JSON.parse(window.localStorage.getItem('waiting_plans') || "[]")
            if (!!this.assetid) {
                planLocal = planLocal.filter(item => item.oc_maintenanceplan_assetuid === this.assetid)
            }
            this.items.unshift(...planLocal)
            if(this.$store.state.user.default_service_id === 'bi'){
                const check_id = this.$store.state.user.default_service_id
                this.check_id = ''
            }else {
                this.check_id = this.$store.state.user.default_service_id
            }
            axios.get(`/oc_maintenanceplanshistory/?oc_maintenanceplan_assetuid__oc_asset_code=${this.$store.state.code_inventaire.oc_asset_code || ''}&oc_maintenanceplan_assetuid__oc_asset_service__startswith=${this.check_id}`)
                .then((reponse) => {
                    this.items.push(...reponse.data.results)
                    this.$store.state.PlanMaintance.push(...reponse.data.results)
                    window.localStorage.setItem('plans', JSON.stringify(reponse.data.results))
                    this.loader = false
                }).catch((error) => {
                    console.error("Erreur lors de la récupération de l'inventaire :", error);
                    this.hasError = true;
                    this.$store.state.PlanMaintance = JSON.parse(window.localStorage.getItem('plans'))
                    getAllRequests().then((reponse) => {
                        for (let item of reponse) {
                            if (item.url = "https://gmao.amidev.bi/api/oc_maintenanceplanshistory/")
                                this.items.unshift(item.data)
                        }
                    })
                    this.loader = false
                });
        }
    },
    mounted() {
        this.windowHeight = window.innerHeight;
        window.addEventListener('resize', this.handleResize);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
        window.addEventListener('online', this.resendOfflineRequests);
        this.getPlan()
    },
    beforeUnmount() {
        Keyboard.removeAllListeners();
        window.removeEventListener('online', this.resendOfflineRequests);

    },
}
</script>



<style scoped></style>