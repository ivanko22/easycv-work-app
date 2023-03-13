<script setup lang="ts">
import { defineProps, ref } from 'vue'

defineProps<{
    cvID: string,
    jobID: string,
    jobTitle?: string,
    companyName?: string,
    workPeriod?: string,
    jobDescription?: string
}>()

const isBaseJobOpen = ref(false)
const isShowIcons = ref(false)

const openCloseJobAcc = () => {
    isBaseJobOpen.value = !isBaseJobOpen.value
}

const handleIconClick = (arg, cvID, jobID) => {

    if (arg === 'remove') {
        updateJobPosition('Remove Job', cvID, jobID)
    }

    if (arg === 'Edit Job') {
        updateJobPosition('Edit Job', cvID, jobID)

    }
}

const emit = defineEmits<{
  (e: 'update:jobsList', value: boolean): void;
  (e: 'update:editJobPositon', value: string): void;
}>()

const updateJobPosition = (arg, cvID, jobID) => {
  emit('update:editJobPositon', arg, cvID, jobID)
}

</script>

<template>
  <div 
    @click="openCloseJobAcc" 
    class="jobContainer"
  >
    <div    
      @mouseover="isShowIcons = true"
      @mouseleave="isShowIcons = false"  
      class="jobHeader"
    >
      <div class="companyPosition">
        <p class="jobPosition">{{ jobTitle }}</p>
        <p class="company">{{ companyName }}</p>
      </div>

      <p class="date">{{ workPeriod }}</p>

      <div class="iconsContainer">
        <svg
          v-if="isShowIcons"
          @click="handleIconClick('remove', cvID, jobID)"
          class="iconContainer"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="iconColor"
            d="M6.39558 18.7329C5.91289 18.7329 5.49982 18.5612 5.15637 18.2177C4.81234 17.8737 4.64032 17.4603 4.64032 16.9776V5.56844H3.7627V3.81318H8.15084V2.93555H13.4166V3.81318H17.8048V5.56844H16.9271V16.9776C16.9271 17.4603 16.7554 17.8737 16.412 18.2177C16.0679 18.5612 15.6546 18.7329 15.1719 18.7329H6.39558ZM15.1719 5.56844H6.39558V16.9776H15.1719V5.56844ZM8.15084 15.2224H9.9061V7.32369H8.15084V15.2224ZM11.6614 15.2224H13.4166V7.32369H11.6614V15.2224ZM6.39558 5.56844V16.9776V5.56844Z"
            fill="#B3B3B3"
          />
        </svg>

        <svg
          v-if="isShowIcons"
          @click="handleIconClick('Edit Job', cvID, jobID)"
          class="iconContainer"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="iconColor"
            d="M10.7813 2.86274C11.1404 2.50377 11.6274 2.30215 12.1351 2.30225C12.6429 2.30234 13.1298 2.50413 13.4888 2.86324C13.8478 3.22234 14.0494 3.70934 14.0493 4.21709C14.0492 4.72485 13.8474 5.21177 13.4883 5.57074L12.7553 6.30274L10.0463 3.59674L10.7803 2.86274H10.7813ZM9.34128 4.30374L3.38528 10.2577C3.2045 10.4387 3.06824 10.6591 2.98728 10.9017L2.07328 13.6447C2.04408 13.7328 2.03994 13.8272 2.06131 13.9174C2.08268 14.0076 2.12873 14.0901 2.1943 14.1557C2.25987 14.2213 2.34239 14.2673 2.43263 14.2887C2.52286 14.3101 2.61727 14.3059 2.70528 14.2767L5.44828 13.3627C5.69128 13.2827 5.91128 13.1457 6.09228 12.9647L12.0483 7.01074L9.34028 4.30374H9.34128Z"
            fill="#B3B3B3"
          />
        </svg>

        <svg
          class="iconContainer"
          :class="{ rotateIconUp: isBaseJobOpen }"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              class="accordionIconColor"
              d="M6.14791 16.8218C5.9394 16.6132 5.82227 16.3304 5.82227 16.0355C5.82227 15.7405 5.9394 15.4577 6.14791 15.2491L11.6535 9.74355L6.14791 4.23798C5.94531 4.02821 5.8332 3.74726 5.83574 3.45563C5.83827 3.16401 5.95524 2.88504 6.16146 2.67883C6.36768 2.47261 6.64664 2.35564 6.93827 2.3531C7.22989 2.35057 7.51084 2.46268 7.72061 2.66528L14.0125 8.95719C14.221 9.16577 14.3382 9.44862 14.3382 9.74355C14.3382 10.0385 14.221 10.3213 14.0125 10.5299L7.72061 16.8218C7.51204 17.0303 7.22919 17.1475 6.93426 17.1475C6.63934 17.1475 6.35649 17.0303 6.14791 16.8218Z"
              fill="black"
            />
          </g>
        </svg>
      </div>
    </div>

    <div v-if="isBaseJobOpen" class="jobDescriptionContainer">
      {{ jobDescription }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.iconsContainer {
  display: flex;
  justify-content: flex-end;
  width: 90px;
  padding-right: 6px;
}

.iconContainer {
  display: block;
  width: 18px;
  height: 18px;
  margin: 6px;

  &:hover .iconColor {
    fill: $primary;
  }
}

.iconColor {
  fill: $lightGrey;
}

.accordionIconColor {
  fill: $lightGrey;
}

.jobContainer {
  display: flex;
  flex-flow: column;
  cursor: pointer;
  width: 408px;
  margin-top: 30px;
  margin-bottom: 30px;
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 6px;

  &:hover {
    border: 1px solid $grey;
  }

  &:hover .accordionIconColor {
    fill: $primary;
  }
}

.jobHeader {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
}

.jobDescriptionContainer {
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 19px;
  font-size: 12px;
  line-height: 16px;
}

.companyPosition {
  display: flex;
  flex-flow: column;
  height: 50px;
  justify-content: space-evenly;
  padding-left: 12px;
}
.jobPosition {
  font-weight: 400;
  font-size: 14px;
  color: $grey;
  margin: 0;
}

.company {
  width: 140px;
  font-weight: 600;
  font-size: 18px;
  color: $black;
  margin: 0;
}

.date {
  width: 166px;
  font-weight: 400;
  font-size: 14px;
  color: $grey;
}

.rotateIconUp {
  transform: rotate(-90deg);
}
</style>
