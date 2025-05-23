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
        <div class="w-screen flex flex-col items-center space-y-3 mb-4">
            <div v-for="item in items" :key="item.oc_maintenanceplan_objectid"
                class="w-[90%] rounded-2xl bg-sky-100  flex flex-col text-sky-900 p-2" @click="PlusInfo(item)">
                <div class="w-full flex items-center justify-between">
                    <p class="font-poppins font-semibold text-sm tracking-wider">{{ item.oc_maintenanceplan_assetuid }}
                    </p>
                    <!-- <p class="font-poppins  text-xs tracking-wider">{{ item.oc_maintenanceplan_frequency }}</p> -->
                    <p class="font-poppins font-normal text-xs tracking-wider">{{ item.oc_maintenanceplan_comment1 }}
                    </p>
                </div>
                <div class="w-full flex flex-col items-start justify-center">
                    <div class=" w-full  flex  flex-col">
                        <div class="flex items-center justify-between">
                            <p class="font-poppins font-semibold text-[16px] tracking-wider">{{
                                item.oc_maintenanceplan_name }}</p>

                            <p class="font-poppins font-semibold text-xs tracking-wider"> <svg
                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                                    <path fill="currentColor"
                                        d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
                                </svg></p>
                        </div>
                        <div class="flex justify-between">
                            <!-- <p class="font-poppins font-normal text-xs tracking-wider">{{ item.oc_maintenanceplan_operator }}</p>
                            <p class="font-poppins font-normal text-xs tracking-wider">{{ item.oc_maintenanceplan_type }}</p> -->
                        </div>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between font-poppins font-normal text-[12px]">
                    <p class="font-poppins">{{ item.oc_maintenanceplan_operator }}</p>
                    <p class="font-poppins">{{ datetime(item.oc_maintenanceplan_updatetime) }}</p>
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
                            v-html="formatInstructions(plus.oc_maintenanceplan_instructions)"></p>
                    </div>
                    <div class="flex gap-5">
                        <button class="font-normal text-sky-500 grow basis-1" @click="$router.push('/Operation')">Opération</button>
                        <button class="font-normal text-red-500 grow basis-1" @click="isInfo = false">Fermer</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex justify-center items-end"
            transition="vfm-fade-in-up">
            <div class="bg-white rounded-t-4xl shadow-lg transition-transform duration-300 ease-in-out"
                :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight}px)` : 'translateY(0)' }">
                <div class=" p-2 flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950"></div>
                </div>
                <div class="p-4 space-y-4">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" @click="isModalVisible = false"
                            viewBox="0 0 24 24"><!-- Icon from Akar Icons by Arturo Wibawa - https://github.com/artcoholic/akar-icons/blob/master/LICENSE -->
                            <path fill="none" stroke="#0c4a6e" stroke-linecap="round" stroke-width="2"
                                d="M20 20L4 4m16 0L4 20" />
                        </svg>
                        <p class="font-poppins text-3xl text-sky-900  font-extralight">Filtre</p>
                    </div>
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Nom">
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Opérateur">
                    <input type="text"
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Service ou structure">
                    <select name="" id=""
                        class="w-[100%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2">
                        <option value="">-------</option>
                        <option value="">Révision necessaire</option>
                    </select>
                    <div class="w-[100%] flex space-x-7 ">
                        <div class="relatif flex overflow-hideen items-center justify-end">
                            <input type="date" name="" id=""
                                class="rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2 grow basis-1">
                            <span class="absolute p-1.5"> 📅</span>
                        </div>
                        <div class="relatif flex overflow-hideen items-center justify-end">
                            <input type="date" name="" id=""
                                class="rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2 grow basis-1">
                            <span class="absolute p-1.5"> 📅</span>
                        </div>
                    </div>
                    <div class="w-[100%] h-[10%] flex  items-center">
                        <input type="checkbox"
                            class="w-[15%] h-[90%]  rounded-lg border-3 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="">
                        <p class="font-poppins text-sky-600">Montrer plan inactifs</p>
                    </div>
                    <div class="flex gap-5 ">
                        <button class="py-3 rounded-lg bg-sky-950 m-0 font-bold text-white grow basis-1">Vider</button>
                        <button class="py-3 rounded-lg bg-sky-950 font-bold text-white grow basis-1">Recherche</button>
                    </div>
                </div>
            </div>
        </VueFinalModal>

    </div>
    <div class="w-screen" v-else>
        <div class="w-screen flex items-center justify-center gap-[10%] my-8">
            <button class="fixed left-4 p-2  bg-sky-900 rounded-xl flex justify-center items-center space-x-2 z-50"
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
        <div class="w-screen h-[90%] overflow-auto p-4">
            <div class="p-4 pt-0 space-y-4">
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Plan de maintenance</p>
                </div>
                <input type="text"
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Référence inventaire" v-model="reference">
                <input type="text"
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Nomenclature" v-model="nomenclature">
                <select name="" id=""
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    v-model="type">
                    <option value="">Type</option>
                    <option value="preventive">Maintenance préventive</option>
                </select>
                <input type="date"
                    class="w-[100%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Fournisseur" v-model="fournisseur">
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Coût</p>
                </div>
                <div class="w-[100%]  flex space-x-7 ">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        v-model="transport">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Prestataire" v-model="prestataire">
                </div>
                <div class="w-[100%]  flex space-x-7 ">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Consommable" v-model="consommable">
                    <input type="number"
                        class="w-[45%]  rounded-lg border-2 border-sky-900/80 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Autre" v-model="Autre">
                </div>
                <div class="flex items-center content-between!">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Info récentes</p>
                </div>
                <div class="">
                    <p class="m-0 ">Dernière modification par</p>
                    <div class="flex ">
                        <p class="m-0 font-semibold">HAVYARIMANA LIBERE</p>
                        <p class="ml-2">{{ items[0].maj }}</p>
                    </div>
                </div>
                <div class="">
                    <p class="m-0 ">Date et heure de création</p>
                    <div class="flex ">
                        <p class="ml-2">{{ items[0].maj }}</p>
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
            if (!this.equipementId) return this.items
            return this.items.filter(item => item.id == this.equipementId)
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
            fournisseur: '',
            type: '',
            nomenclature: '',
            reference: '',
            plan: [],
            isKeyboardVisible: false,
            keyboardHeight: 0,
            items: [],
            isInfo: false,
            hasError: false,

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
        // Getinventaire() {
        //     axios.get(`/oc_maintenanceplans/`)
        //         .then((reponse) => {
        //             this.items = reponse.data.results
        //             this.$store.state.equipement_inventaire = reponse.data.results
        //             console.log(this.items)
        //         })
        // },
        async postPlan() {
            console.log('equipementId =', this.equipementId);

            if (!this.equipementId) {
                console.error('equipementId est invalide. Il faut une valeur valide pour la clé.');
                return;
            }

            const db = await openDB('myDatabase', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('plans')) {
                        db.createObjectStore('plans', { keyPath: 'id' });
                    }
                },
            });

            const data = {
                id: this.equipementId,
                Autre: this.Autre,
                consommable: this.consommable,
                prestataire: this.prestataire,
                transport: this.transport,
                fournisseur: this.fournisseur,
                type: this.type,
                nomenclature: this.nomenclature,
                reference: this.reference,
            };


            const key = await db.put('plans', data);
            console.log('Données sauvegardées dans IndexedDB', key);
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
        if (this.$store.state.PlanMaintance.length === 0) {
            this.getPlan()
        } else {
            this.items = this.$store.state.PlanMaintance
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        Keyboard.removeAllListeners();
    },

}
</script>



<style scoped></style>