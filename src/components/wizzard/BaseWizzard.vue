<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import wizzardPoint from './wizzardPoint.vue'

const props = withDefaults(
  defineProps<{
    registration?: boolean;
    experience?: boolean;
    skills?: boolean;
    active?: string;
    isRegistered?: boolean;
    isExperienced?: boolean;
    isSkilled?: boolean;
  }>(),
  {
    isRegistered: false,
    registration: false
  }
)

</script>

<template>
    <div class="wizzardContainer">
        <wizzard-point
            :active="registration"
            :passed="isRegistered"
            step="1"
            label="Registration"
        />
        <wizzard-point
            :active="experience"
            :passed="isExperienced"
            step="2"
            label="Work Experience"
        />
        <wizzard-point
            :active="skills"
            :passed="isSkilled"
            step="3"
            label="Job Category & Skills"
            :show-route="false"
        />
    </div>
</template>

<style scoped lang="scss">
    .wizzardContainer{
        display: flex;
        width: 420px;
        margin-top: 30px;
        margin-bottom: 10px;
    }

</style>
