<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
  
const props = withDefaults(
    defineProps<{
        selected?: boolean;
        label: string;
        type: string;
  }>(),
    {
        selected: false
    }
)

</script>


<template>
    <div class="chipSelected" :class="{ chipNotSelected: type === 'not selected' }">
        {{ label }}

        <svg v-if="type === 'selected'" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.56332 2.07064C1.65109 1.98289 1.77013 1.93359 1.89425 1.93359C2.01837 1.93359 2.1374 1.98289 2.22518 2.07064L3.88031 3.72577L5.53543 2.07064C5.62371 1.98538 5.74195 1.9382 5.86468 1.93926C5.98741 1.94033 6.10481 1.98956 6.19159 2.07634C6.27838 2.16313 6.32761 2.28053 6.32867 2.40326C6.32974 2.52599 6.28256 2.64422 6.19729 2.7325L4.54217 4.38763L6.19729 6.04276C6.28256 6.13104 6.32974 6.24927 6.32867 6.372C6.32761 6.49473 6.27838 6.61213 6.19159 6.69892C6.10481 6.7857 5.98741 6.83493 5.86468 6.836C5.74195 6.83706 5.62371 6.78988 5.53543 6.70462L3.88031 5.04949L2.22518 6.70462C2.1369 6.78988 2.01866 6.83706 1.89593 6.836C1.7732 6.83493 1.6558 6.7857 1.56902 6.69892C1.48223 6.61213 1.43301 6.49473 1.43194 6.372C1.43087 6.24927 1.47805 6.13104 1.56332 6.04276L3.21844 4.38763L1.56332 2.7325C1.47557 2.64473 1.42627 2.52569 1.42627 2.40157C1.42627 2.27745 1.47557 2.15842 1.56332 2.07064V2.07064Z" fill="white"/>
        </svg>
    </div>
</template>

<style scoped lang="scss">
    .chipSelected{
        display: flex;
        align-items: center;
        height: 22px;
        border-radius: 2px;
        font-weight: 400;
        font-size: 11px;
        font-weight: 600;
        color: var(--white);
        background: var(--primary);
        margin-top: 9px;
        margin-left: 4px;
        margin-right: 4px;
        padding-left: 6px;
        padding-right: 6px;
        cursor: pointer;

        svg{
            padding-left: 4px;
        }
    }

    .chipNotSelected{
        color: var(--grey);
        background: var(--white);
        font-weight: 500;

        &:hover{
            background: var(--primary);
            color: var(--white);
        }
    }
    
</style>