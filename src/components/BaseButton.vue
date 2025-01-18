<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    primary?: boolean;
    disabled?: boolean;
    btnTypeClass?: string;
    label?: string;
    type: string;
  }>(),
  {
    primary: false,
    disabled: true,
    type: 'disabled',
    label: 'Button Name'
  }
)
</script>

<template>
  <button class="disabled-btn">
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
.disabled-btn {
  margin-top: 60px;
  border: 1px solid var(--lightGrey);
  border-radius: 2px;
  width: 410px;
  height: 50px;
  font-weight: 600;
  font-size: 16px;
  color: var(--lightGrey);
  background-color: unset;
  cursor: text;
}

.primaryBtn {
  border: 1px solid var(--primary);
  background-color: var(--primary);
  color: var(--white);
  cursor: pointer;
  transition: .25s;
  margin-bottom: 60px;
}
</style>
