<template>
    <div class="w-screen h-screen">
        <div class="w-screen h-[10%] overflow-hidden flex items-center justify-center gap-[10%]">
            <button
                class="fixed left-4 w-20 h-10 bg-sky-900 shadow-xl rounded-xl flex justify-center items-center space-x-2 z-50"
                @click="isModalVisible = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
            <button
                class="fixed right-4 w-25 h-10 bg-sky-900 shadow-xl rounded-xl flex justify-center items-center space-x-2 z-50"
                @click="handleNewItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Nouveau</p>
            </button>
        </div>

        <div class="w-screen h-[90%] flex flex-col items-center space-y-6 shadow-xl">
            <div v-for="item in items" :key="item.id"
                class="w-[90%] h-[23%] rounded-2xl bg-sky-100 overflow-hidden flex flex-col text-sky-900 ">
                <div class="w-full h-[25%] flex items-center justify-center space-x-[5%]">
                    <p class="font-poppins font-semibold text-sm tracking-wider">{{ item.id }}</p>
                    <p class="font-poppins  text-xs tracking-wider">{{ item.idPlus }}</p>
                    <p class="font-segoe font-normal text-xs tracking-wider">{{ item.date }}</p>
                </div>
                <div class="w-full h-[50%] flex flex-col items-start justify-center px-4">
                    <div class=" w-full  flex  flex-col">
                        <div class="flex items-center space-x-2">
                            <p class="font-poppins font-semibold text-lg tracking-wider">{{ item.nom }}</p>
                            <p class="font-poppins font-semibold text-xs tracking-wider">({{ item.code }})</p>
                        </div>
                        <div class="flex space-x-32">
                            <p class=" font-thin text-xs tracking-wider">{{ item.coding }}</p>
                            <p class=" font-thin text-xs tracking-wider">{{ item.codingPlus }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-[25%] flex items-center justify-center space-x-[11%]">
                    <p class="font-poppins text-xs tracking-wider flex items-end ">{{ item.localisation }}</p>
                    <p class="font-segoe font-normal text-xs tracking-wider">{{ item.maj }}</p>
                </div>
            </div>
        </div>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex justify-center items-end"
            transition="vfm-fade-in-up">
            <div class="w-[90vw] h-[85vh] bg-white rounded-t-xl shadow-lg  overflow-hidden">
                <div class=" h-[3%]  flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950"></div>
                </div>
                <div class="h-[14%]  flex space-x-3 items-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" @click="isModalVisible = false"
                        viewBox="0 0 24 24">
                        <path fill="none" stroke="#014268" stroke-linecap="round" d="m6 6l12 12m0-12L6 18" />
                    </svg>
                    <p class="font-poppins text-4xl text-sky-900  font-extralight">Filtre</p>
                </div>
                <div class="h-[65%]  p-4 space-y-4 overflow-auto">
                    <input type="text"
                        class="w-[100%] h-[16%] rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Nom">
                    <input type="text"
                        class="w-[100%] h-[16%] rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Opérateur">
                    <input type="text"
                        class="w-[100%] h-[16%] rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Service ou structure">
                    <select name="" id=""
                        class="w-[100%] h-[16%] rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2">
                        <option value="">-------</option>
                        <option value="">Révision necessaire</option>
                    </select>
                    <div class="w-[100%] h-[16%] flex space-x-7 ">
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
                </div>
                <div class=" h-[18%] w-[100%]  flex justify-center items-center gap-9 ">
                    <button class="w-[40%] h-[60%] rounded-lg bg-sky-950 m-0 font-bold text-white">Vider</button>
                    <button class="w-[40%] h-[60%] rounded-lg bg-sky-950 font-bold text-white">Recherche</button>
                </div>
            </div>
        </VueFinalModal>
    </div>
</template>


<script>
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
export default {
    components: {
        VueFinalModal
    },
    setup() {
        const isModalVisible = ref(false);
        const items = [
            {
                id: '[1.10658] 1.10658',
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
                id: '[1.10658] 1.10658',
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
                id: '[1.10658] 1.10658',
                idPlus: '04.trimestriel',
                date: '12-02-2023',
                nom: 'LATRINE À FOSSE 2',
                code: 'I.CDS.X.5',
                coding: 'Latrine',
                codingPlus: 'Maintenance préventive',
                localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                maj: '12-02-2023'
            },
        ];

        return { items, isModalVisible };
    }
};
</script>


<style scoped></style>