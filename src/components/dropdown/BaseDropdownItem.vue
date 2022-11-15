<template>
  <ul @mouseover="isShowCircle = true" @mouseleave="isShowCircle = false"> {{ props.selected }}
    <div v-show="isShowCircle" class="hoverCircle"></div>
  <slot/>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    selected: string,
  }>(),
  {
    selected: 'Jan'
  }
)

const isShowCircle = ref(false)

</script>

<style scoped lang="scss">

  ul {
    // padding: 0;
    // padding-left: 14px;
    // padding-right: 13px;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
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
