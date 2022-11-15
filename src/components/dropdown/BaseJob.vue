<template>
    <div class="jobContainer">

    <div class="companyPosition">
        <p class="jobPosition">{{ jobTitle }}</p>
        <p class="company"> {{ companyName }} </p>
    </div>

    <p class="date"> {{ workPeriod }} </p>
    <img src="@/assets/svg/arrow.svg"/>

    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import BaseForm from '../BaseForm.vue'

defineProps<{
  jobTitle?: string
  companyName?: string
  workPeriod?: string
}>()

</script>

<style scoped lang="scss">

    .jobContainer{
        display: flex;
        width: 408px;
        margin-top: 30px;
        margin-bottom: 30px;
        align-items: center;
        justify-content: space-around;
        height: 70px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
    }

    .companyPosition{
        display: flex;
        flex-flow: column;
        height: 50px;
        justify-content: space-evenly;
    }
    .jobPosition{
        font-weight: 400;
        font-size: 14px;
        color: $grey;
        margin: 0;
    }

    .company{
        width: 140px;
        font-weight: 600;
        font-size: 18px;
        color:$black;
        margin: 0;
    }

    .date{
        width: 166px;
        font-weight: 400;
        font-size: 14px;
        color: $grey;
    }
</style>
