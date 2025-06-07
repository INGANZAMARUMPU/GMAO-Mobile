<template>
    <div class="space-y-4 my-4">
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Infrastructures</p>
        <div class="flex gap-2 mx-3">
            <div
                class="w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Total</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static.total_infrastructures) }}</p>
            </div>
            <div
                class=" w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-5 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">En bon état</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static.nouveaux_equipements) }}</p>
            </div>
            <div
                class=" w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-5 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Fraction</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static.nouveaux_equipements) }}</p>
            </div>
        </div>
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Equipements</p>
        <div class="flex gap-2 mx-3">
            <div
                class="w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Total</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static.total_equipements) }}</p>
            </div>
            <div
                class=" w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-5 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">En bon état</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static.nouveaux_equipements) }}</p>
            </div>
            <div
                class=" w-50 max-sm:w-30 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-5 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Fraction</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static.nouveaux_equipements) }}</p>
            </div>
        </div>
        <p class="font-poppins font-bold text-base mx-3.5 text-sky-900">Performance</p>
        <div class="flex gap-2 mx-3">
            <div
                class="w-30 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">préventions</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static?.interventions?.equipements?.preventives) }}</p>
            </div>
            <div
                class="w-full sm:w-50 bg-sky-100 rounded-xl flex flex-col  items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">Programmées</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static?.interventions?.equipements?.correctives) }}</p>
            </div>
            <div
                class="w-full sm:w-50 bg-sky-100 rounded-xl flex flex-col items-center gap-2 py-2 px-2 justify-center grow basis-1 sm:max-w-[320px]">
                <p class="font-poppins font-medium text-[13px] leading-none text-center text-sky-900">couverts</p>
                <p class="font-poppins font-bold text-[17px] leading-none text-sky-900 ">{{money(static?.interventions?.equipements?.correctives_succes) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios';
export default {
    data() {
        return {
            static: this.$store.state.static,
            start_date: '2020-01-01',
            end_date: new Date().toISOString().split('T')[0],
        }
    },
    methods: {

    },
    watch: {
        "$store.state.static"(newVal) {
            this.static = newVal
        }
    },
    mounted() {
        if (this.$store.state.static.length === 0) {
            this.getStatics(this.start_date, this.end_date)
        } else {
            this.items = this.$store.state.Operation
        }
    }

}
</script>

<style></style>