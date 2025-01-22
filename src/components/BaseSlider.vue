<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref("0");
const sliderTitlePosition = ref("4px");
const yearYears = ref("Years");
const errorMessage = ref('Required');

const sliderThumbPosition = [
  4, 22, 41, 60, 78, 97, 116, 135, 153, 172, 190, 209, 227, 245, 264, 283, 302,
  320, 339, 357, 376,
];

const onInput = () => {
  sliderTitlePosition.value = `${sliderThumbPosition[currentValue.value]}px`;
  if (currentValue.value === "1") {
    yearYears.value = "Year";
    errorMessage.value = '';
  } 
  else {
    yearYears.value = "Years";
    errorMessage.value = '';
  }

  emitSliderValue();
};

const emit = defineEmits<{
  (e: 'update:sliderValue', value: string): void
  }>()

const emitSliderValue = () => {
  emit('update:sliderValue', currentValue.value)
}
</script>

<template>
  <div class="sliderContainer">
    <input
      v-model="currentValue"
      class="slider"
      type="range"
      min="0"
      max="20"
      @input="onInput"
    />

    <label class="sliderLabel"> Experience </label>

    <div class="filledSlider"></div>
    <div class="sliderThumbTitle">
      {{ currentValue }}
      <p class="sliderThumbTitleYears">{{ yearYears }}</p>
    </div>
    <p class="errorMessage"> {{ errorMessage }} </p>
  </div>
</template>

<style scoped lang="scss">
  .sliderContainer {
    position: relative;
    padding-left: 4px;
    padding-right: 4px;
    display: flex;
    height: 50px;
    flex-direction: column;
    margin-top: 98px;
  }
  .slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%;
    height: 5px;
    outline: none;
    opacity: 1;
    -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
    transition: opacity 0.2s;
    background: var(--primary);
    border-radius: 4px;
  }

  .slider:hover {
    opacity: 1;
    background: var(--primary);
    cursor: pointer;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 32px;
    background: var(--primary);
    cursor: pointer;
  }

  .slider::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 6px var(--primary);
  }

  .slider::-moz-range-thumb {
    width: 30px;
    height: 30px;
    border-radius: 32px;
    cursor: pointer;
  }

  .slider::-webkit-slider-runnable-track {
    z-index: 1;
  }

  .slider::-moz-range-thumb:hover {
    background: var(--primary)Hover;
    box-shadow: 0px 0px 6px var(--primary);
  }

  .filledSlider {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    top: 2px;
    left: 6px;
    height: 5px;
    width: v-bind(sliderTitlePosition);
    background: var(--primary);
    border-radius: 4px;
  }

  .sliderThumbTitle {
    position: absolute;
    top: -4px;
    z-index: 1;
    left: v-bind(sliderTitlePosition);
    width: 34px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    color: var(--white);
    pointer-events: none;
  }

  .sliderThumbTitleYears {
    margin-top: 8px;
    font-weight: 500;
    font-size: 12px;
    color: var(--grey);
  }

  .sliderLabel {
    position: relative;
    left: 10px;
    bottom: 56px;
    font-size: 14px;
    color: var(--grey);
    pointer-events: none;
  }
  .errorMessage{
      position: absolute;
      right: 0px;
      font-weight: 400;
      font-size: 12px;
      margin-top: 57px;
      text-align: right;
      color: var(--error);
  }
</style>
