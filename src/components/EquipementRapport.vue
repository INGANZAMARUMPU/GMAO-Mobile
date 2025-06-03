<template>
    <div class="space-y-4 my-4">
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Nombre d'équipements</p>
        <div class="flex gap-2 mx-3">
            <div class="w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Opérationnels</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">19</p>
            </div>
            <div class="w-full sm:w-50 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Non opérationnels
                </p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">30</p>
            </div>
            <div class="w-full sm:w-50 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Mis au rébat</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">30</p>
            </div>
        </div>
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Nombre d'intervation</p>
        <div class="flex gap-2 mx-3">
            <div class="w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">préventives</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(static?.interventions?.preventives) }}</p>
            </div>
            <div class="w-full sm:w-50 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">correctives</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(static?.interventions?.correctives) }}</p>
            </div>
            <div class="w-full sm:w-50 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">correctives avec succés</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(static?.interventions?.correctives_succes) }}</p>
            </div>
        </div>
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Frais</p>
        <div class="flex gap-2 mx-3  ">
            <div class="w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Réparation</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(static?.frais_maintenance?.preventives) }}</p>
            </div>
            <div class=" bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-5 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Préventives</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(parseInt(static?.frais_maintenance?.correctives)) }}</p>
            </div>
        </div>
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Appels aux extérieurs pour maintenance</p>
        <div class="flex gap-2 mx-3">
            <div class="w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Préventive</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(static?.interventions_exterieures?.preventives) }}</p>
            </div>
            <div class=" bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-5 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">correctives</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(parseInt(static?.interventions_exterieures?.correctives)) }}</p>
            </div>
        </div>
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Fraction d'équipements</p>
        <div class="flex gap-2 mx-3">
            <div class="w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Opérationnels</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">63%</p>
            </div>
            <div class=" w-30 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Rejetter non opérationnels</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">0.0%</p>
            </div>
        </div>
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Nombre</p>
        <div class="flex gap-2 mx-3">
            <div class="w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Total d'équipements</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(static.nombre_total_equipements) }}</p>
            </div>
            <div class=" w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-5 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Nouveaux équipements</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{ money(static.nouveaux_equipements) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios';
export default {
    data() {
        return {
            static: {}
        }
    },
    methods:{
        getStatics(){
            axios.get(`/statistics/?start_date=${this.start_date}&end_date=${this.end_date}&nomenclature=${this.$store.state.user.zipcode}`)
            .then((reponse) => {
                this.static = reponse.data
                this.$store.state.static = reponse.data
                console.log(this.static)
            })
        }
    },
    mounted(){
        if(this.$store.state.static.length === 0 ) {
            this.getStatics()
        } else{
            this.static = this.$store.state.static
        }  
    }
}
</script>

<style>
</style>