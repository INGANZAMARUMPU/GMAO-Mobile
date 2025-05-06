<template>
    <div class=" h-screen flex flex-col overflow-y-hidden">
        <div class="h-[17%]  ">
            <div class="flex h-full ">
                <div class="w-1/2 ">
                    <img src="../assets/view/img/unnamed.jpg" alt="" class="w-45  max-sm:w-38 max-md:bg-violet-100">
                </div>
                <div class="w-1/2  justify-end items-center flex space-x-1">
                    <div class="">
                        <p class="font-segoe-ui-variable font-semibold text-[15px] max-sm:text-[12px]">Nzeyimana Jean
                        </p>
                        <p for="" class="font-segoe-ui-variable font-light text-[10px] max-sm:text-[10px]">Technicien
                            Electronique</p>
                    </div>
                    <div class=" space-y-1.5 ">
                        <img src="../assets/view/img/smiling.jpeg" alt="" class="w-16 h-4.1 rounded-2xl mx-3">
                        <div class="w-7 h-[6px] rounded-2xl bg-green-500 mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-[73%] bg-pink-600 overflow-y-auto">
            <slot></slot>
        </div>
        <div class="h-[10%] bg-violet-400"></div>
    </div>

</template>

<script>
import { RouterView } from 'vue-router';
</script>

<style></style>