<template>
    <div class="w-screen h-screen relative">
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
            <button
                class="custom-box custom-right">
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
        <div class="w-screen h-[90%] flex flex-col items-center space-y-3 shadow-xl">
            <div v-for="item in items" :key="item.id"
                class="w-[90%] rounded-2xl bg-sky-100 text-sky-900 overflow-hidden flex flex-col">
                <div class="p-2">
                    <div class="w-full flex items-center justify-between">
                        <p class="font-poppins font-semibold text-sm tracking-wider">{{ item.id }}</p>
                        <p class="font-segoe font-normal text-xs tracking-wider">{{ item.date }}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-center">
                        <div class=" w-full flex  flex-col justify-start">
                            <div class="flex items-center">
                                <p class="font-poppins font-semibold text-lg tracking-wider">{{ item.nom }}</p>
                                <p class="font-poppins font-semibold text-xs tracking-wider">({{ item.code }})</p>
                            </div>
                            <p class="font-poppins font-normal text-xs tracking-wider">{{ item.coding }}</p>
                        </div>
                        <div class=" w-full flex items-end">
                            <p class="font-poppins text-xs tracking-wider flex items-end ">{{ item.localisation }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full bg-green-800 text-white flex items-center justify-between p-2">
                    <p class="font-poppins font-normal text-xs tracking-wider">Mise à jour</p>
                    <p class="font-poppins font-normal text-xs tracking-wider">{{ item.maj }}</p>
                </div>
            </div>
        </div>
        <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex justify-center items-end"
            transition="vfm-fade-in-up">
            <div class="bg-white rounded-t-4xl shadow-lg  overflow-hidden">
                <div class="p-2 flex justify-center items-center">
                    <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950"></div>
                </div>
                <div class="p-4 pt-0 space-y-4">
                    <div class=" flex items-center">
                        <p class="font-poppins text-4xl text-sky-900  font-extralight">Filtre</p>
                    </div>
                    <input type="text"
                        class="w-[100%] rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Nomanclature">
                    <input type="text"
                        class="w-[100%] rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Description">
                    <input type="text"
                        class="w-[100%] rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Fournisseur">
                    <div class="w-[100%] flex space-x-7 ">
                        <input type="number"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="code">
                        <input type="number"
                            class="w-[45%]  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                            placeholder="Numéro de série">
                    </div>
                    <div class="w-[100%] flex space-x-7 ">
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
                date: '12-02-2023',
                nom: 'LATRINE À FOSSE 2',
                code: 'I.CDS.X.5',
                coding: 'Latrine',
                localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                maj: '12-02-2023'
            },
            {
                id: '[1.10658] 1.10658',
                date: '12-02-2023',
                nom: 'LATRINE À FOSSE 2',
                code: 'I.CDS.X.5',
                coding: 'Latrine',
                localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                maj: '12-02-2023'
            },
            {
                id: '[1.10658] 1.10658',
                date: '12-02-2023',
                nom: 'LATRINE À FOSSE 2',
                code: 'I.CDS.X.5',
                coding: 'Latrine',
                localisation: 'BI.KI.VU.BDSVUMBI-BDSVUMBI',
                maj: '12-02-2023'
            },
        ];

        return { items, isModalVisible };
    }
};
</script>


<style scoped>
.vfm__container.vfm-fade-in-up.vfm-enter-active,
.vfm__container.vfm-fade-in-up.vfm-leave-active {
    transition: all 7s ease;
}

.vfm__container.vfm-fade-in-up.vfm-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.vfm__container.vfm-fade-in-up.vfm-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.vfm__container.vfm-fade-in-up.vfm-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.vfm__container.vfm-fade-in-up.vfm-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>