<template>
    <div class="w-screen h-screen">
        <div class="w-screen h-[10%] overflow-hidden flex items-center">
            <button class="fixed top-[] left-0 w-20 h-10 bg-sky-900 shadow-xl mx-4 my-4 rounded-xl flex justify-center items-center space-x-2 z-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffff" />
                </svg>
                <p class="font-poppins font-medium text-[13px] text-white">Filtre</p>
            </button>
        </div>
        <div class="w-screen h-[90%] flex flex-col items-center space-y-6 shadow-xl">
            <div v-for="item in items" :key="item.id"
                class="w-[90%] h-[23%] rounded-2xl bg-sky-900 overflow-hidden flex flex-col text-white shadow-xl">
                <div class="w-full h-[25%] flex items-center justify-center space-x-[50%]">
                    <p class="font-poppins font-semibold text-sm tracking-wider">{{ item.id }}</p>
                    <p class="font-segoe font-normal text-xs tracking-wider">{{ item.date }}</p>
                </div>
                <div class="w-full h-[50%] flex flex-col items-start justify-center px-4">
                    <div class=" w-full h-[50%] flex items-end">
                        <div class="flex items-center space-x-2">
                            <p class="font-poppins font-semibold text-lg tracking-wider">{{ item.nom }}</p>
                            <p class="font-poppins font-semibold text-xs tracking-wider">({{ item.code }})</p>
                        </div>
                    </div>
                    <div class=" w-full h-[50%] flex items-end">
                        <p class="font-poppins text-xs tracking-wider flex items-end ">{{ item.localisation }}</p>
                    </div>
                </div>
                <div class="w-full h-[25%] bg-green-800 flex items-center justify-center space-x-[50%]">
                    <p class="font-segoe font-normal text-xs tracking-wider">Mise à jour</p>
                    <p class="font-segoe font-normal text-xs tracking-wider">{{ item.maj }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    setup() {
        const items = [
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
            },
        ];

        return { items };
    }
};
</script>


<style scoped></style>