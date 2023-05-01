<script setup lang="ts">
import { defineProps, ref } from 'vue'

defineProps<{
  jobPosition: string,
  jobDescription: string,
  companyName?: string,
  workPeriod?: string,
  jobEmployer: string,
}>()

</script>

<template>
  <div class="jobContainer">  

  <div class="editIconContainer">
    <div>
      <svg class="editIcon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7813 2.86274C11.1404 2.50377 11.6274 2.30215 12.1351 2.30225C12.6429 2.30234 13.1298 2.50413 13.4888 2.86324C13.8478 3.22234 14.0494 3.70934 14.0493 4.21709C14.0492 4.72485 13.8474 5.21177 13.4883 5.57074L12.7553 6.30274L10.0463 3.59674L10.7803 2.86274H10.7813ZM9.34128 4.30374L3.38528 10.2577C3.2045 10.4387 3.06824 10.6591 2.98728 10.9017L2.07328 13.6447C2.04408 13.7328 2.03994 13.8272 2.06131 13.9174C2.08268 14.0076 2.12873 14.0901 2.1943 14.1557C2.25987 14.2213 2.34239 14.2673 2.43263 14.2887C2.52286 14.3101 2.61727 14.3059 2.70528 14.2767L5.44828 13.3627C5.69128 13.2827 5.91128 13.1457 6.09228 12.9647L12.0483 7.01074L9.34028 4.30374H9.34128Z" fill="#B3B3B3"/>
    </svg>

    <p class="editIconLabel"> Edit </p>
    </div>

  </div>

    <div class="jobPositionContainer">
      <p class="employerTitle">{{ jobEmployer }}</p>
      <p class="workPeriod">{{ workPeriod }}</p>
    </div>
    
    <p class="jobTitle">{{ jobPosition }}</p>
    <p class="summary">{{ jobDescription }}</p>

  </div>
</template>

<style scoped lang="scss">

.editIconLabel {
  font-weight: 600;
  font-size: 14px;
  color: $primary;
  padding-right: 6px;
  margin: 0;
  }

.jobContainer {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ffffff;

  &:hover {
    border: 1px solid $ultraLightGrey;
  }

  &:hover .editIconContainer {
    opacity: 1;
  }

}
.jobPositionContainer {
    display: flex;
    align-items: center;
  }

  .editIconContainer {
    display: flex;
    opacity: 0;
    align-items: center;
    justify-content: center;
    top: -20px;
    position: relative;
    
    div {
      display: flex;
      align-items: center;
      background: white;
      padding-left: 12px;
      padding-right: 12px;
    }

  }

  .editIcon {
    padding-right: 10px;

    path {
      fill: $primary;
    }
  }

  .workPeriod {
    font-weight: 400;
    font-size: 14px;
    color: $black;
  }
  .jobTitle {
    font-weight: 600;
    font-size: 16px;
    margin: 0;
  }
  .employerTitle {
    font-weight: 600;
    font-size: 14px;
  }

  .summary {
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color: $black;
  }

</style>
