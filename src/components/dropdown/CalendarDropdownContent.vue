<template>
  <div class="dropdownContent">
    <slot name="slotMonths"></slot>
    <slot name="slotYears"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dropdownContent {
  position: absolute;
  padding-left: 4px;
  padding-right: 4px;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 202px;
  height: 204px;
  background: #ffffff;
  box-shadow: 0px 9px 10px rgba(0, 0, 0, 0.21);
  border-radius: 2px;
  border: 1px $primary solid;
  padding-top: 8px;
  padding-bottom: 8px;
}

.rowDropdownDatapicker {
  display: flex;
}
</style>
