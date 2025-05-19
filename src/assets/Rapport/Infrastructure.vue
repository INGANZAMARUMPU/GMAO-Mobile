<template>
    <Base #slot3>
    <div class="">
        <div class="h-1/8  flex justify-center items-center gap-[14%] ">
            <div class="" @click="changeSlot('Inventaire')">
                <div class="flex w-full justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                        <path fill="#014268"
                            d="M5 22q-.825 0-1.412-.587T3 20V8.725q-.45-.275-.725-.712T2 7V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v3q0 .575-.275 1.013T21 8.724V20q0 .825-.587 1.413T19 22zM4 7h16V4H4zm5 7h6v-2H9z" />
                    </svg>
                </div>
                <p class="font-segoe-ui-variable font-bold text-[10px] ">Inventaire</p>
            </div>

            <div class="" @click="changeSlot('PlansMaintenance')">
                <div class=" flex w-full justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 32 32"><!-- Icon from Carbon by IBM - undefined -->
                        <path fill="#014268"
                            d="m29.707 19.293l-3-3a1 1 0 0 0-1.414 0L16 25.586V30h4.414l9.293-9.293a1 1 0 0 0 0-1.414M19.586 28H18v-1.586l5-5L24.586 23zM26 21.586L24.414 20L26 18.414L27.586 20zM20 13v-2h-2.142a4 4 0 0 0-.425-1.019l1.517-1.517l-1.414-1.414l-1.517 1.517A4 4 0 0 0 15 8.142V6h-2v2.142a4 4 0 0 0-1.019.425L10.464 7.05L9.05 8.464l1.517 1.517A4 4 0 0 0 10.142 11H8v2h2.142a4 4 0 0 0 .425 1.019L9.05 15.536l1.414 1.414l1.517-1.517a4 4 0 0 0 1.019.425V18h2v-2.142a4 4 0 0 0 1.019-.425l1.517 1.517l1.414-1.414l-1.517-1.517A4 4 0 0 0 17.858 13zm-6 1a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2" />
                        <path fill="currentColor"
                            d="M12 30H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10h-2V4H6v24h6Z" />
                    </svg>
                </div>
                <p class="font-segoe-ui-variable font-bold text-[10px]">Plan Maintenance</p>
            </div>

            <div class="" @click="changeSlot('Operation')">
                <div class="flex w-full justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 512 512"><!-- Icon from Siemens Industrial Experience Icons by Siemens AG - https://github.com/siemens/ix-icons/blob/main/LICENSE.md -->
                        <path fill="#014268" fill-rule="evenodd"
                            d="M362.667 106.667L448 192v277.334H106.667V106.667zm-17.673 42.667h-195.66v277.333h256V209.673zM298.667 42.667l42.667 42.667h-256v320H42.667V42.667zM286.97 209.842c16.137 20.982 21.58 46.795 16.41 65.64q-.969 4.653 68.231 72.545q22.627 22.627 0 45.255q-21.296 21.297-42.593 2.506l-74.869-71.075c-18.847 5.172-44.659-.273-65.64-16.41c-15.39-20.235-20.698-46.684-16.41-65.64l32.82 32.82l32.82-16.41l16.41-32.821l-32.82-32.82c18.956-4.287 45.406 1.02 65.64 16.41" />
                    </svg>
                </div>
                <p class="font-segoe-ui-variable font-bold text-[10px] ">Opérations</p>
            </div>
        </div>
        <div class="w-screen h-4  flex  items-center  justify-center border-b-[0.3px] ">
            <div :class="[
                'w-[68%] h-[100%] flex items-center  transition-all duration-1000 ease-in-out',
                index === 0 ? 'translate-x-[-4px]' :
                    index === 1 ? 'justify-center translate-x-[0px]' :
                        'justify-end translate-x-[4px]'
            ]">
                <div class="w-[10%] h-2 bg-sky-900 rounded-xl ">

                </div>
            </div>
        </div>
    </div>

    <div class="relative h-7/8 overflow-y-auto">
        <transition :name="`fade-slide-${transitionDirection}`" mode="out-in">
            <component :is="currentSlot" :key="currentSlot" v-bind="slotProps" @changer-index="setSlot" />
        </transition>
    </div>


    </Base>
</template>

<script>
import Base from '../../components/Base.vue'
import Inventaire from '../../components/GroupInfrastructure/inventaire.vue'
import PlansMaintenance from '../../components/GroupInfrastructure/PlanMaintenance.vue'
import Operation from '../../components/GroupInfrastructure/OperationMaintenance.vue'
export default {
    components: {
        Base, Inventaire, PlansMaintenance, Operation
    },
    data() {
        return {
            index: 0,
            slots: ['Inventaire', 'PlansMaintenance', 'Operation'],
            transitionDirection: 'left',
            activeSlot: 'Inventaire',
            slotProps: {}

        }
    },
    computed: {
        currentSlot() {
            return this.slots[this.index]
        }
    },
    methods: {
        nextSlot() {
            this.transitionDirection = 'left'
            this.index = (this.index + 1) % this.slots.length
        },
        prevSlot() {
            this.transitionDirection = 'right'
            this.index = (this.index - 1 + this.slots.length) % this.slots.length
        },
        changeSlot(newSlot) {
            const newIndex = this.slots.indexOf(newSlot);
            this.transitionDirection = newIndex > this.index ? 'left' : 'right';
            this.index = newIndex;
            this.activeSlot = newSlot;
        },
        setSlot(index, id, nom) {
            console.log('Données reçues:', index, id, nom)

            if (index < 0 || index >= this.slots.length) return

            this.transitionDirection = index > this.index ? 'left' : 'right'
            this.index = index

            if (index === 1) {
                this.slotProps = { equipementId: id }
            } else if (index === 2) {
                this.slotProps = { nom }

            } else {
                this.slotProps = {}
            }
        }
    }
}
</script>

<style scoped>
.fade-slide-left-enter-active,
.fade-slide-left-leave-active,
.fade-slide-right-enter-active,
.fade-slide-right-leave-active {
    transition: all 0.3s ease;
    position: absolute;
    width: 100%;
}

.fade-slide-left-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.fade-slide-left-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-slide-right-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-slide-right-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>