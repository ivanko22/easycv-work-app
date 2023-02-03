<script setup lang="ts">
import { defineProps, withDefaults, ref } from 'vue'

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
    <ul> {{ props.selected }}
    <slot/>
    </ul>
  </template>
  
  <style scoped lang="scss">
  
    ul {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    width: 420px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: left;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: $black;
    cursor: pointer;

    &:hover{
    color: $primary;
    font-weight: 600;
    }
    }
  
    .hoverCircle{
      position: absolute;
      width: 46px;
      height: 46px;
      border: 2px solid $primary;
      border-radius: 26px;
      color: $primary;
    }
  
  </style>
  