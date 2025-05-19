<template>
    <div class="overflow-hidden" v-if="!showNewView">
        <div class="flex items-center justify-center gap-[10%] my-8 mb-10">
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
        <div class="w-screen h-full flex flex-col items-center space-y-3 shadow-xl">
            <div v-for="item in filteredItems" :key="item.id"
                class="w-[90%] rounded-2xl bg-sky-100 overflow-hidden flex flex-col text-sky-900 p-2"
                @click="$emit('changer-index', 2, item.equipementId, item.nom)">
                <div class="w-full flex items-center justify-between">
                    <p class="font-poppins font-semibold text-sm tracking-wider">{{ item.id }}</p>
                    <p class="font-poppins  text-xs tracking-wider">{{ item.idPlus }}</p>
                    <p class="font-segoe font-normal text-xs tracking-wider">{{ item.date }}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-center">
                    <div class=" w-full  flex  flex-col">
                        <div class="flex items-center space-x-2">
                            <p class="font-poppins font-semibold text-lg tracking-wider">{{ item.nom }}</p>
                            <p class="font-poppins font-semibold text-xs tracking-wider">({{ item.code }})</p>
                        </div>
                        <div class="flex justify-between">
                            <p class=" font-normal text-xs tracking-wider">{{ item.coding }}</p>
                            <p class=" font-normal text-xs tracking-wider">{{ item.codingPlus }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between font-poppins font-normal text-[12px]">
                    <p class="">{{ item.localisation }}</p>
                    <p class="">{{ item.maj }}</p>
                </div>
            </div>
        </div>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex justify-center items-end"
            transition="vfm-fade-in-up">
            <div class="bg-white rounded-t-3xl shadow-lg  overflow-hidden">
                <div class=" p-2 flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950"></div>
                </div>
                <div class="p-4 space-y-4">
                    <div class="flex items-center content-between!">
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
                    <div class="w-[100%]  flex space-x-7 ">
                        <input type="date"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="">
                        <input type="date"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="">
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
</template>


<script>
import axios from 'axios'
import { VueFinalModal } from 'vue-final-modal'
import { openDB } from 'idb';

export default {
    components: {
        VueFinalModal
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
            // equipementId:'',
            items: [
                {
                    id: '1.10658',
                    idPlus: '04.trimestriel',
                    date: '12-02-2023',
                    nom: 'LATRINE À FOSSE 1',
                    code: 'I.CDS.X.5',
                    coding: 'Latrine',
                    codingPlus: 'Maintenance préventive',
                    localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                    maj: '12-02-2023'
                },
                {
                    id: '1.10640',
                    idPlus: '04.trimestriel',
                    date: '12-02-2023',
                    nom: 'LATRINE À FOSSE 2',
                    code: 'I.CDS.X.5',
                    coding: 'Latrine',
                    codingPlus: 'Maintenance préventive',
                    localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                    maj: '12-02-2023'
                },
                {
                    id: '1.10658',
                    idPlus: '04.trimestriel',
                    date: '12-02-2023',
                    nom: 'LATRINE À FOSSE 3',
                    code: 'I.CDS.X.5',
                    coding: 'Latrine',
                    codingPlus: 'Maintenance préventive',
                    localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                    maj: '12-02-2023'
                },
                {
                    id: '1.10640',
                    idPlus: '04.trimestriel',
                    date: '12-02-2023',
                    nom: 'FOSSE 3',
                    code: 'I.CDS.X.5',
                    coding: 'Latrine',
                    codingPlus: 'Maintenance préventive',
                    localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                    maj: '12-02-2023'
                },
                {
                    id: '1.10660',
                    idPlus: '04.trimestriel',
                    date: '12-02-2023',
                    nom: 'LATRINE À FOSSE 2',
                    code: 'I.CDS.X.4',
                    coding: 'Latrine',
                    codingPlus: 'Maintenance préventive',
                    localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                    maj: '12-02-2023'
                },

            ]
        }
    },
    methods: {
        openModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
        },
        handleNewItem() {
            this.showNewView = true
        },
        returnToMainView() {
            this.showNewView = false
        },
        // postPlan() {
        //     const data = {
        //         id: this.equipementId,
        //         Autre: this.Autre,
        //         consommable: this.consommable,
        //         prestataire: this.prestataire,
        //         transport: this.transport,
        //         fournisseur: this.fournisseur,
        //         type: this.type,
        //         nomenclature: this.nomenclature,
        //         reference: this.reference,
        //     }

        //     localStorage.setItem('planData', JSON.stringify(data))
        // }
        async postPlan() {
            console.log('equipementId =', this.equipementId); // Ajoute ça pour voir la valeur

            if (!this.equipementId) {
                console.error('equipementId est invalide. Il faut une valeur valide pour la clé.');
                return; // stop la fonction si pas de clé valide
            }

            const db = await openDB('myDatabase', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('plans')) {
                        db.createObjectStore('plans', { keyPath: 'id' });
                    }
                },
            });

            const data = {
                id: this.equipementId, // clé ici
                Autre: this.Autre,
                consommable: this.consommable,
                prestataire: this.prestataire,
                transport: this.transport,
                fournisseur: this.fournisseur,
                type: this.type,
                nomenclature: this.nomenclature,
                reference: this.reference,
            };

            
            const reponse = await db.put('plans', data);
            console.log('Données sauvegardées dans IndexedDB', reponse.data);
            this.showNewView = false
        }

    },
    mounted() {
        console.log("ID reçu :", this.equipementId)
    }

}
</script>



<style scoped></style>