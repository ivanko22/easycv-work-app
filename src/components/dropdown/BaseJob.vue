<template>
    <div @click="openCloseJobAcc" class="jobContainer">
        <div class="jobHeader">
            <div class="companyPosition">
                <p class="jobPosition">{{ jobTitle }}</p>
                <p class="company"> {{ companyName }} </p>
            </div>

            <p class="date"> {{ workPeriod }} </p>
            <!-- <img :class="{ rotateIconUp: isBaseJobOpen }" src="@/assets/svg/arrow.svg"/> -->

            <svg :class="{ rotateIconUp: isBaseJobOpen }" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                 <path class="iconColor" d="M6.14791 16.8218C5.9394 16.6132 5.82227 16.3304 5.82227 16.0355C5.82227 15.7405 5.9394 15.4577 6.14791 15.2491L11.6535 9.74355L6.14791 4.23798C5.94531 4.02821 5.8332 3.74726 5.83574 3.45563C5.83827 3.16401 5.95524 2.88504 6.16146 2.67883C6.36768 2.47261 6.64664 2.35564 6.93827 2.3531C7.22989 2.35057 7.51084 2.46268 7.72061 2.66528L14.0125 8.95719C14.221 9.16577 14.3382 9.44862 14.3382 9.74355C14.3382 10.0385 14.221 10.3213 14.0125 10.5299L7.72061 16.8218C7.51204 17.0303 7.22919 17.1475 6.93426 17.1475C6.63934 17.1475 6.35649 17.0303 6.14791 16.8218Z" fill="black"/>
                </g>
            </svg>

        </div>

        <div v-if="isBaseJobOpen" class="jobDescriptionContainer">
        {{ jobDescription }}
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

defineProps<{
    jobTitle?: string,
    companyName?: string,
    workPeriod?: string,
    jobDescription?: string
}>()

const isBaseJobOpen = ref(false)

const openCloseJobAcc = () => {
    isBaseJobOpen.value = !isBaseJobOpen.value
}

</script>

<style scoped lang="scss">

    .iconColor{
        fill: $lightGrey2;
    }

    .jobContainer{
        display: flex;
        flex-flow: column;
        cursor: pointer;
        width: 408px;
        margin-top: 30px;
        margin-bottom: 30px;
        box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 6px;

        &:hover{
            border: 1px solid $grey;
        }

        &:hover .iconColor{
            fill: $primary;
        }
    }

    .jobHeader{
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 70px;
    }

    .jobDescriptionContainer{
        padding-right: 15px;
        padding-left: 15px;
        padding-bottom: 19px;
        font-size: 12px;
        line-height: 16px;
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

    .rotateIconUp{
        transform: rotate(-90deg);
    }
</style>
