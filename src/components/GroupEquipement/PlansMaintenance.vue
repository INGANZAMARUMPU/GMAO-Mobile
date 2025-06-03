<template>
    <Base #slot3>
    <div class="h-full mb-4 overflow-auto" v-if="!showNewView">
        <div class="flex items-center justify-center gap-[10%] my-8 mb-5 pb-4">
            <button @click="isModalVisible = true" class="custom-box custom-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
            <button class="custom-box custom-right" @click="handleNewItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7-7v14" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Nouveau</p>
            </button>
        </div>
        <!-- <div v-if="hasError" class="erreur">
            <div class="message">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01" />
                </svg>
                <p>Une erreur est survenue</p>
                <p class="text-[8px]">veuillez contacter la direction s'il vous plait</p>
                <p class="text-[8px]">ou veuiller vérifier l'état de votre connexion</p>
            </div>
        </div> -->
        <div class="w-screen flex flex-col items-center space-y-3 mb-4">
            <div v-for="item in filteredItems" :key="item.oc_maintenanceplan_objectid"
                class="w-[95%] rounded-2xl bg-sky-100  flex flex-col text-sky-900 p-2" @click="PlusInfo(item)">
                <div class="w-full flex items-center justify-between">
                    <p class="font-poppins font-semibold text-sm tracking-wider">{{ item.oc_maintenanceplan_assetuid }}
                    </p>
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
                :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight}px)` : 'translateY(0)' }">
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
                    class="w-[100%]  rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 px-2"
                    placeholder="Nomanclature" v-model="nomenclature"> -->
                    <input type="text" v-model="oc_maintenanceplan_operator"
                        class="w-[100%]  rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 px-2"
                        placeholder="Opérateur">
                    <select name="" id=""
                        class="w-[100%]  rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 px-2"
                        v-model="oc_maintenanceplan_type__icontains">
                        <option value="">Types</option>
                        <option value="1">Contrôle</option>
                        <option value="2">Maintenance</option>
                        <option value="3">Curatif</option>
                        <option value="99">Autre</option>
                    </select>
                    <div class="w-[100%]  flex justify-between ">
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" v-model="oc_maintenanceplan_historydate__gte"
                                class="relative w-full rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 "
                                placeholder="code">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                                viewBox="0 0 24 24">
                                <path fill="#014268"
                                    d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                            </svg>
                        </div>
                        <div class="w-[48%] relative flex items-center">
                            <input type="date" v-model="oc_maintenanceplan_historydate__lte"
                                class="relative w-full rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 "
                                placeholder="code">
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
                            @click="FiltrerMaintenancePlan">Recherche</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>

    </div>
    <div class="" v-else>
        <!-- <div v-if="hasError" class="erreur">
            <div class="message">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                    viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01" />
                </svg>
                <p>Une erreur est survenue</p>
                <p class="text-[8px]">veuillez contacter la direction s'il vous plait</p>
                <p class="text-[8px]">ou veuiller vérifier l'état de votre connexion</p>
            </div>
        </div> -->
        <div class="w-screen flex items-center justify-center gap-[10%] my-8">
            <button class="fixed left-4 p-2  bg-sky-900 rounded-xl flex justify-center items-center space-x-2 z-50"
                @click="showNewView = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m15 18l-6-6l6-6" />
                </svg>
            </button>
        </div>
        <div class="overflow-auto ">
            {{ onLineStatus }}
            <div class="px-3 pt-0 space-y-4 my-4">
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-[29px] text-sky-900  font-extralight">Plan de maintenance</p>
                </div>
                <input type="text" v-model="nom"
                    class="w-full rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none py-2 pl-3"
                    placeholder="Nom du plan">
                <select name="" id=""
                    class="w-full rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    v-model="type">
                    <option value="">Types</option>
                    <option value="1">Contrôle</option>
                    <option value="2">Maintenance</option>
                    <option value="3">Curatif</option>
                    <option value="99">Autre</option>
                </select>
                <select name="" id=""
                    class="w-full rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    v-model="frequency">
                    <option value="">Frequency</option>
                    <option value="defect">Défectueux</option>
                    <option value="ok">ok</option>
                    <option value="revsion">Révision nécessaire</option>
                </select>
                <textarea v-model="commentaire" rows="6" placeholder="Écrivez votre commentaire ici..."
                    class="w-full p-3 border-2 border-sky-900 rounded-lg resize-y  focus:border-3 focus:border-sky-900 focus:outline-none   text-gray-800" />
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Coût</p>
                </div>
                <input type="number" v-model="transport"
                    class="w-full rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none py-2 pl-3"
                    placeholder="Transport">
                <input type="number" v-model="prestataire"
                    class="w-full rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none py-2 pl-3"
                    placeholder="Préstataire">
                <input type="number" v-model="consommable"
                    class="w-full rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none py-2 pl-3"
                    placeholder="Consommable">
                <input type="number" v-model="Autre"
                    class="w-full rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none py-2 pl-3"
                    placeholder="Autre">
                <div class="">
                    <p class="m-0 ">Dernière modification par</p>
                    <div class="flex ">
                        <!-- <p class="ml-2">{{ items[0].maj }}</p> -->
                    </div>
                </div>
                <div class="">
                    <p class="m-0 ">Date et heure de création</p>
                    <div class="flex ">
                        <!-- <p class="ml-2">{{ items[0].maj }}</p> -->
                    </div>
                </div>
                <div class="flex gap-5 ">
                    <button class="py-3 rounded-lg bg-sky-950 font-bold text-white grow basis-1"
                        @click="postPlan">Sauvegarder</button>
                </div>
            </div>
        </div>
    </div>
    </Base>
</template>

<script>
import Base from '../Base.vue';
import axios from 'axios'
import { VueFinalModal } from 'vue-final-modal'
import { openDB } from 'idb';
import { Keyboard } from '@capacitor/keyboard'
import { addOfflineRequest, getAllRequests, deleteRequest } from '../../indexDb';


export default {
    components: {
        VueFinalModal, Base
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
                item.oc_maintenanceplan_assetuid = code
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
            frequency: '',
            commentaire: '',
            plan: [],
            isKeyboardVisible: false,
            keyboardHeight: 0,
            items: [],
            isInfo: false,
            hasError: false,
            oc_maintenanceplan_operator: '',
            oc_maintenanceplan_type__icontains: '',
            oc_maintenanceplan_historydate__gte: '',
            oc_maintenanceplan_historydate__lte: ''
        }
    },
    methods: {
        async FiltrerMaintenancePlan() {
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
        selectItem(plus) {
            this.$store.state.code_plan = plus
            this.$router.push('/Operation')
        },
        openModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
            this.isInfo = false
        },
        handleNewItem() {
            this.showNewView = true
        },
        returnToMainView() {
            this.showNewView = false
        },
        async afficherUnPlan() {
            const db = await openDB('myDatabase', 1);
            if (!this.equipementId) {
                console.warn('Pas d\'equipementId fourni en props.');
                return;
            }
            const plan = await db.get('plans', this.equipementId);
            if (plan) {
                console.log('Plan trouvé :', plan);
                this.plan = plan;
            } else {
                console.log('Aucun plan trouvé pour cet ID');
            }
        },
        // async postPlan() {
        //     const data = {
        //         'oc_maintenanceplan_assetuid': this.$store.state.code_inventaire.oc_asset_code,
        //         'oc_maintenanceplan_operator': this.$store.state.user.fullname,
        //         'oc_maintenanceplan_comment4': this.Autre,
        //         'oc_maintenanceplan_comment1': this.consommable,
        //         'oc_maintenanceplan_comment3': this.prestataire,
        //         'oc_maintenanceplan_comment2': this.transport,
        //         'oc_maintenanceplan_name': this.nom,
        //         'oc_maintenanceplan_type': this.type,
        //         'oc_maintenanceplan_instructions': this.commentaire,
        //         'oc_maintenanceplan_frequency': this.frequency,
        //     };
        //     const url = '/oc_maintenanceplanshistory/';
        //     if (!navigator.onLine) {
        //         const stored = JSON.parse(localStorage.getItem('offlineRequests') || '[]');
        //         stored.push({
        //             method: 'post',
        //             url,
        //             data
        //         });
        //         localStorage.setItem('offlineRequests', JSON.stringify(stored));
        //         this.items.unshift(data);
        //         this.showNewView = false;
        //         localStorage.setItem('plan_temp', JSON.stringify(data));

        //         console.warn("Requête enregistrée localement. Elle sera envoyée quand la connexion sera rétablie.");
        //         return;
        //     }

        //     try {
        //         const response = await axios.post(url, data);
        //         this.items.unshift(response.data);
        //         this.showNewView = false;
        //         localStorage.setItem('plan', JSON.stringify(response.data));
        //     } catch (error) {
        //         console.error("Erreur lors de la récupération de l'inventaire :", error);
        //         this.hasError = true;
        //     }
        // },
        async postPlan() {
            const data = {
                oc_maintenanceplan_assetuid: this.$store.state.code_inventaire.oc_asset_code,
                oc_maintenanceplan_operator: this.$store.state.user.fullname,
                oc_maintenanceplan_comment4: this.Autre,
                oc_maintenanceplan_comment1: this.consommable,
                oc_maintenanceplan_comment3: this.prestataire,
                oc_maintenanceplan_comment2: this.transport,
                oc_maintenanceplan_name: this.nom,
                oc_maintenanceplan_type: this.type,
                oc_maintenanceplan_instructions: this.commentaire,
                oc_maintenanceplan_frequency: this.frequency,
            };

            const url = '/oc_maintenanceplanshistory/';

            console.log("CLICKED ")
            console.log("ONLINE STATUS : ", this.onLineStatus)

            if (!navigator.onLine) {
                await addOfflineRequest({ method: 'post', url, data });
                this.items.unshift(data);
                this.showNewView = false;
                console.warn("📦 Requête enregistrée dans IndexedDB (offline).");
                return;
            }

            try {
                const response = await axios.post(url, data);
                this.items.unshift(response.data);
                this.showNewView = false;
                localStorage.setItem('plan', JSON.stringify(response.data));
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
                } catch (err) {
                    console.error('⚠️ Erreur lors de l’envoi offline :', err);
                }
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
        axios.get(`/oc_maintenanceplanshistory/`)
            .then((reponse) => {
                this.items = reponse.data.results
                this.$store.state.PlanMaintance = reponse.data.results
                console.log(this.items)
            }).catch((error) => {
                console.error("Erreur lors de la récupération de l'inventaire :", error);
                this.hasError = true;
            });
    }

},
mounted() {
    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', this.handleResize);
    Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
    Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
    window.addEventListener('online', this.resendOfflineRequests);
    if (this.$store.state.PlanMaintance.length === 0) {
        this.getPlan()
    } else {
        this.items = this.$store.state.PlanMaintance
    }
},
beforeUnmount() {
    Keyboard.removeAllListeners();
    window.removeEventListener('online', this.resendOfflineRequests);

},

}
</script>



<style scoped></style>