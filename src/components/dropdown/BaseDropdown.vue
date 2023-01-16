<template>
  <div class="dropdownContainer">

    <label v-if="isShowLabel" class="dropdownLabel">
        {{ label }}
    </label>

    <div
      class="dropdown"
      @click="openYearsOrMonthsDropdown(['monthDropdown', 'monthDropdown'])"
    >
      <slot/>
      <img class="dropdown-icon" src="@/assets/svg/dropdown.svg"/>

    </div>

    <base-dropdown-content v-if="isDropdownOpen" v-click-away="onClickAway">
      <template v-if="isMonthsShow" #slotMonths>
        <base-dropdown-item
          v-for="(month, key) in months"
          v-bind:key="key"
          :selected="month"
          @click="openYearsOrMonthsDropdown(['selectedMonth', month, key])"
        />
      </template>

      <template v-if="isYearsShow" #slotYears>
        <base-dropdown-item
          v-for="year in years"
          v-bind:key="year.toString()"
          :selected="year.toString()"
          @click="openYearsOrMonthsDropdown(['selectedYear', year])"
        />
      </template>
    </base-dropdown-content>

    <p v-if="!isValidDropdown" class="errorMessage"> {{ 'Required' }} </p>

  </div>

</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, provide, inject, computed, ref } from 'vue'

import { directive as vClickAway } from 'vue3-click-away'
import BaseDropdownContent from '@/components/dropdown/BaseDropdownContent.vue'
import BaseDropdownItem from '@/components/dropdown/BaseDropdownItem.vue'

const props = withDefaults(
  defineProps<{
    label?: string;
    isValidDropdown: false;
  }>(),
  {
    label: 'Start Date'
  }
)

const isShowLabel = ref(false)
const isDropdownOpen = ref(false)
const dropdownLabel = ref()
const isMonthsShow = ref(false)
const selectedMonth = ref()
const selectedPeriod = inject('selectedPeriod')
const isYearsShow = ref(false)
const selectedYear = ref(2000)
const currentPeriod = ref()
const isDateValid = ref(false)

const months = { id01: 'Jan', id02: 'Feb', id03: 'Mar', id04: 'Apr', id05: 'May', id06: 'June', id07: 'July', id08: 'Aug', id09: 'Sept', id10: 'Oct', id11: 'Nov', id12: 'Dec' }
const years = ref([2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022])

const dateValidation = (date) => {
  if (date.length === 10) {
    isDateValid.value = true
    isShowLabel.value = true
  } else {
    isDateValid.value = false
  }
}

const openYearsOrMonthsDropdown = (selected) => {
  if (selected[0] === 'monthDropdown') {
    isMonthsShow.value = !isMonthsShow.value
    isDropdownOpen.value = true
    isYearsShow.value = false
  }

  if (selected[0] === 'selectedMonth') {
    selectedMonth.value = selected[1]

    if (props.label === 'startDate') {
      selectedPeriod.value[0] = selected[2].slice(2)
      dropdownLabel.value = selected[1]
    } else {
      selectedPeriod.value[1] = selected[2].slice(2)
      dropdownLabel.value = selected[1]
    }

    isMonthsShow.value = false
    isYearsShow.value = true
  }

  if (selected[0] === 'selectedYear') {
    selectedYear.value = selected[1]

    if (props.label === 'startDate') {
      selectedPeriod.value[0] = selectedYear.value.toString() + '-' + selectedPeriod.value[0] + '-01'
      currentPeriod.value = selectedPeriod.value[0]
      dropdownLabel.value = dropdownLabel.value + ' ' + selectedYear.value.toString()

      dateValidation(currentPeriod.value)
    } else {
      selectedPeriod.value[1] = selectedYear.value.toString() + '-' + selectedPeriod.value[1] + '-01'
      currentPeriod.value = selectedPeriod.value[1]
      dropdownLabel.value = dropdownLabel.value + ' ' + selectedYear.value.toString()

      dateValidation(currentPeriod.value)
    }

    isDropdownOpen.value = false
  }

  updateCurrentPeriod()
}

const emit = defineEmits<{(e: 'update:currentPeriod', value: string, label: string, isDateValid: boolean, dropdownLabel: string): void;
  }>()

const updateCurrentPeriod = () => {
  emit('update:currentPeriod', currentPeriod.value, props.label, isDateValid.value, dropdownLabel.value)
}

</script>

<style scoped lang="scss">

  .dropdownContainer{
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .dropdown{
    height: 50px;
    background: $white;
    box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    text-align: left;
    outline: none;
    border: none;
    border: 1px solid $lightGrey;
    padding-left: 16px;
    font-size: 16px;
    width: 184px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dropdown:focus {
  border: 1.5px solid $primary !important;
}

  .dropdown:hover {
    border: 1px solid $middleGrey;
  }

  .dropdownLabel{
    position: absolute;
    margin-bottom: 94px;
    font-size: 14px;
    color: $grey;
    transition: .25s;
    pointer-events: none;
  }

  .dropdown-icon{
    position: relative;
    left: -16px;
  }

  .errorMessage{
    position: absolute;
    width: 192px;
    font-weight: 400;
    font-size: 12px;
    margin-top: 96px;
    text-align: right;
    color: $error;
  }

</style>
