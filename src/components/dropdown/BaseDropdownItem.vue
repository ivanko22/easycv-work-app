<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    selected: string,
  }>(),
  {
    selected: ''
  }
)
  
</script>

<template>
    <ul class="dropdownItem"> {{ props.selected }}
    <slot/>
    </ul>
</template>
  
<style scoped lang="scss">
  
  .dropdownItem {
      margin-top: 0px;
      margin-bottom: 0px;
      padding-left: 11px;
      padding-right: 0px;
      width: 420px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: left;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: var(--black);
      cursor: pointer;

      &:hover{
      color: var(--primary);
      }
    }
  
  .hoverCircle{
    position: absolute;
    width: 46px;
    height: 46px;
    border: 2px solid var(--primary);
    border-radius: 26px;
    color: var(--primary);
  }
  
</style>
  