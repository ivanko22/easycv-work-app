<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref("0");
const sliderPosition = ref("-3px");
const yearYears = ref("years");

const onInput = () => {
  sliderPosition.value = `${currentValue.value * 20}${"px"}`;

  if (currentValue.value === "1") {
    yearYears.value = "year";
  } else {
    yearYears.value = "years";
  }
  console.log("currentValue", currentValue.value, sliderPosition.value);
};
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
    <p class="sliderThumbTitle">{{ currentValue }} {{ yearYears }}</p>
  </div>
</template>

<style scoped lang="scss">
.sliderContainer {
  position: relative;
  display: flex;
  height: 50px;
  flex-direction: column;
  margin-top: 98px;
}
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 404px; /* Full-width */
  height: 5px;
  outline: none; /* Remove outline */
  opacity: 1; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;

  background: #cae6ca;
  border-radius: 4px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 32px;
  background: $primary;
  cursor: pointer;
}

.slider::-webkit-slider-thumb:hover {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 32px;
  background: $primary;
  cursor: pointer;
  opacity: 1 !important;
}

.slider::-webkit-slider-runnable-track {
  z-index: 1;
}

.slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 32px;
  cursor: pointer;
}

.filledSlider {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: 2px;
  height: 5px;
  width: v-bind(sliderPosition);
  background: $primary;
  border-radius: 4px;
}

.sliderThumbTitle {
  position: absolute;
  top: 11px;
  left: v-bind(sliderPosition);
  width: 34px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: $grey;
}

.sliderLabel {
  position: relative;
  left: 10px;
  bottom: 56px;
  font-size: 14px;
  color: $grey;
  pointer-events: none;
}
</style>
