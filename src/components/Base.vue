<template>
    <div class=" relative h-screen flex flex-col overflow-y-hidden">
        <div class="">
            <div class="flex h-full ">
                <div class="w-1/2 ">
                    <img src="../assets/view/img/unnamed.jpg" alt="" class="w-[70%] ">
                </div>
                <div class="w-1/2  justify-end items-center flex ">
                    <div class="w-1/2">
                        <p class="font-segoe-ui-variable font-semibold text-[12px] ">Nzeyimana Jean
                        </p>
                        <p for="" class="font-segoe-ui-variable font-light text-[10px] sm:text-[10px]">Technicien
                            Electronique</p>
                    </div>
                    <div class="space-y-1.5 w-1/2">
                        <div class=" w-full h-full  flex items-center justify-center bg-white rounded-2xl"
                            @click="navigate('/')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="none" stroke="#014268" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-[90%] overflow-hidden">
            <slot v-if="activeSlot === 1" name="slot1"></slot>
            <slot v-else-if="activeSlot === 2" name="slot2"></slot>
            <slot v-else-if="activeSlot === 3" name="slot3"></slot>
        </div>

        <div class=" bottom-0 bg-sky-900  ">
            <div class="w-screen flex items-center justify-center gap-x-18">
                <div class="flex flex-col items-center py-2" @click="navigate('/equipement')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl',
                        activeSlot === 1 ? 'bg-amber-50' : ''
                    ]"></div>
                    <div class=" flex w-full justify-center">
                        <svg width="40" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="">
                            <path
                                d="M5 5V31.6667C5 32.5507 5.35119 33.3986 5.97631 34.0237C6.60143 34.6488 7.44928 35 8.33333 35H35"
                                stroke="white" stroke-width="2" stroke-miterlimit="5.759" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M11.6667 23.3333L18.3334 16.6666L25.0001 23.3333L35.0001 13.3333" stroke="white"
                                stroke-width="2" stroke-miterlimit="5.759" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M30 13.3333H35V18.3333" stroke="white" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Rapport</p>
                </div>
                <div class="flex flex-col items-center" @click="navigate('/equipementSpecial')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl',
                        activeSlot === 2 ? 'bg-amber-50' : ' translate-1 '
                    ]"></div>
                    <div class="">
                        <svg width="30" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_186_1108)">
                                <path
                                    d="M2.222 0L0 2.222L3.91431 8.99123L6.45277 8.61892L21.9475 24.1154L20.6258 25.3846C19.9489 26.0615 19.9489 27.0871 20.6258 27.764L21.3129 28.4528C21.9898 29.1297 23.0255 29.1297 23.5332 28.4528L25.5437 30.4615C25.3745 31.4769 25.5437 32.6835 26.3898 33.5297L35.5384 42.6259C37.4 44.4874 40.4461 44.4874 42.3077 42.6259C44.5077 40.5951 44.4874 37.5591 42.6258 35.6975L33.5297 26.5472C32.6835 25.7011 31.4769 25.3626 30.4615 25.7011L28.2395 23.6923C28.7472 23.0154 28.7472 21.9797 28.2395 21.4703L27.6049 20.8374C27.4511 20.677 27.2664 20.5493 27.0619 20.4621C26.8575 20.3749 26.6375 20.3299 26.4152 20.3299C26.1929 20.3299 25.973 20.3749 25.7685 20.4621C25.5641 20.5493 25.3794 20.677 25.2255 20.8374L24.1154 21.9475L8.62061 6.45277L8.98954 3.91431L2.222 0ZM35.222 0.0524615C31.8831 -0.225077 27.456 1.98846 25.3846 3.91262C22.836 6.46123 23.2523 9.79339 25.278 13.0105L21.6835 16.6066L24.222 19.4615C25.5758 18.2769 27.5728 18.2769 28.9266 19.4615L29.6154 20.1486L29.7745 20.3077L31.2552 18.8269C34.3149 20.6258 37.4998 20.8848 39.9283 18.4563C42.2975 16.2563 44.8664 10.8308 43.6818 7.61539L38.9231 12.5332C38.2461 13.2102 37.2206 13.2102 36.5437 12.5332L31.6241 7.61539C31.4637 7.46154 31.3361 7.27684 31.2489 7.07239C31.1616 6.86794 31.1167 6.64796 31.1167 6.42569C31.1167 6.20342 31.1616 5.98344 31.2489 5.77899C31.3361 5.57454 31.4637 5.38984 31.6241 5.236L36.5454 0.318154C36.1223 0.169231 35.6992 0.0930769 35.222 0.0524615ZM16.6066 21.1538L10.4703 27.2885C9.81081 27.1425 9.13695 27.0716 8.46154 27.0769C3.72308 27.0769 0 30.8 0 35.5385C0 40.2769 3.72308 44 8.46154 44C13.2 44 16.9231 40.2769 16.9231 35.5385C16.9231 34.6703 16.786 33.836 16.5525 33.0525L20.1486 29.4563L19.6206 28.7692C18.2668 27.4154 18.2769 25.3643 19.4615 24.0088L16.6066 21.1538ZM29.722 28.8758C29.9335 28.8758 30.1332 28.9165 30.3025 29.0874L40.2989 39.0822C40.6374 39.4206 40.6374 39.9588 40.2989 40.2972C39.9604 40.6357 39.4189 40.6357 39.0804 40.2972L29.0874 30.3025C28.7489 29.964 28.7489 29.4258 29.0874 29.0874C29.2566 28.9182 29.5105 28.8758 29.722 28.8758ZM9.62584 31.1469L12.8514 34.3742L11.6871 38.7623L7.29892 39.9266L4.07169 36.6994L5.236 32.3112L9.62584 31.1469Z"
                                    fill="#ffff" />
                            </g>
                            <defs>
                                <clipPath id="clip0_186_1108">
                                    <rect width="44" height="44" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Equipement</p>
                </div>
                <div class="flex flex-col items-center py-2" @click="navigate('/Infrastructure')">
                    <div :class="[
                        'w-7 h-1 rounded-2xl',
                        activeSlot === 3 ? 'bg-amber-50 ' : ''
                    ]"></div>
                    <div class="">
                        <svg width="30" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M22.058 5.44343L12.8076 10.7863L22.058 16.1386L31.3084 10.7926L22.058 5.44343ZM36.02 8.06457L22.058 0L8.09601 8.06457L3.6043 5.47171C3.33613 5.30402 3.03696 5.19207 2.72463 5.14253C2.4123 5.09299 2.0932 5.10688 1.78634 5.18337C1.47949 5.25985 1.19117 5.39737 0.938559 5.58772C0.685953 5.77807 0.474235 6.01736 0.316025 6.29133C0.157814 6.5653 0.0563498 6.86833 0.0176799 7.18237C-0.02099 7.49641 0.00392596 7.81502 0.0909427 8.11922C0.177959 8.42342 0.325296 8.70697 0.524169 8.95298C0.723042 9.19899 0.969382 9.40242 1.2485 9.55114L5.73708 12.1471V28.2857L19.7022 36.3534V41.6429C19.7022 42.268 19.9504 42.8676 20.3922 43.3096C20.834 43.7517 21.4332 44 22.058 44C22.6828 44 23.282 43.7517 23.7238 43.3096C24.1656 42.8676 24.4138 42.268 24.4138 41.6429V36.3534L38.3789 28.2857V12.1471L42.8707 9.55114C43.3961 9.23058 43.7753 8.71702 43.9271 8.12032C44.079 7.52362 43.9915 6.89114 43.6833 6.35818C43.3751 5.82521 42.8707 5.43407 42.278 5.2684C41.6853 5.10274 41.0513 5.17571 40.5117 5.47171L36.02 8.06457ZM33.6674 14.8689L24.4138 20.218V30.91L33.6674 25.564V14.8689ZM10.4487 25.564L19.7022 30.9069V20.2211L10.4487 14.8657V25.564Z"
                                fill="#ffff" />
                        </svg>
                    </div>
                    <p class="font-segoe-ui-variable font-bold text-[10px] text-white ">Infrastructure</p>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    computed: {
        activeSlot() {
            switch (this.$route.path) {
                case '/':
                    return 1;
                case '/equipementSpecial':
                    return 2;
                case '/Infrastructure':
                    return 3;
                default:
                    return 1;
            }
        }
    },
    data() {
        return {
            flipped: false
        }
    },
    methods: {
        navigate(path) {
            if (this.$route.path !== path) {
                this.$router.push(path);
            }
        },
        flip() {
            this.flipped = !this.flipped
        }
    }
};
</script>


<style>
.perspective {
    perspective: 1000px;
}

.backface-hidden {
    backface-visibility: hidden;
}

.transform-style {
    transform-style: preserve-3d;
}

.rotate-y-180 {
    transform: rotateY(180deg);
}
</style>