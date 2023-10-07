<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, provide, inject, computed, ref } from 'vue'
import BaseDropdownContent from '@/components/dropdown/BaseDropdownContent.vue'
import BaseDropdownItem from '@/components/dropdown/BaseDropdownItem.vue'
import CalendarDropdownContent from './CalendarDropdownContent.vue'
import CalendarDropdownItem from '@/components/dropdown/CalendarDropdownItem.vue'

const props = withDefaults(
  defineProps<{
    label?: string;
    dropdownType: string;
    width: string;
    years: [string, number];
    error: string;
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

const jobCategories = { id01: 'JavaScript', id02: 'Java', id03: '.NET', id04: 'Python', id05: 'PHP', id06: 'Node.js', id07: 'iOS', id08: 'Android', id09: 'C++', 
  id10: 'Flutter', id11: 'Golang', id12: 'Ruby', id13: 'Scala', id14: 'Salesforce', id15: 'Rust',
  id16: 'QA', id17: 'QA Automation', id18: 'Design', id19: 'Artist', id20: 'Project Manager', id21: 'Product Manager',
  id22: 'Lead', id23: 'DevOps', id24: 'Business Analyst', id25: 'Data Science', id26: 'Data Analyst',
  id27: 'Sysadmin', is28: 'Unity', id28: 'SQL', id29: 'Security', id30: 'Data Engineer', id31: 'Scrum Master'
}

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
    } 
    
    else if (props.label === 'endDate'){
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
    } 
    
    else if (props.label === 'endDate'){
      selectedPeriod.value[1] = selectedYear.value.toString() + '-' + selectedPeriod.value[1] + '-01'
      currentPeriod.value = selectedPeriod.value[1]
      dropdownLabel.value = dropdownLabel.value + ' ' + selectedYear.value.toString()

      dateValidation(currentPeriod.value)
    }

    isDropdownOpen.value = false
  }

  updateCurrentPeriod()
}

const emit = defineEmits<{
  (e: 'update:currentPeriod', value: string, label: string, isDateValid: boolean, dropdownLabel: string): void;
  (e: 'update:dropdownValue', value: string): void
  }>()

const updateCurrentPeriod = () => {
  emit('update:currentPeriod', currentPeriod.value, props.label, isDateValid.value, dropdownLabel.value)
}

const updateDropdownValue = (value, type) => {
  isDropdownOpen.value = false
  emit('update:dropdownValue', value, type)
}

</script>

<template>
  <template v-if="props.dropdownType === 'calendar'">
    <div class="dropdownContainer categoryPosition">

      <label v-if="isShowLabel" class="dropdownLabel dropdownLabelCalendar">
          {{ label }}
      </label>

      <div
        class="dropdown"
        :class="[{dropdownWidth410: width === 'longDropdown'}, 'dropdownWidth184']"
        @click="openYearsOrMonthsDropdown(['monthDropdown', 'monthDropdown'])"
      >
        <slot/>
        <img class="dropdown-icon" src="@/assets/svg/dropdown.svg"/>

      </div>

      <CalendarDropdownContent v-if="isDropdownOpen && props.dropdownType === 'calendar'">
        <template v-if="isMonthsShow" #slotMonths>
          <CalendarDropdownItem
            v-for="(month, key) in months"
            v-bind:key="key"
            :selected="month"
            @click="openYearsOrMonthsDropdown(['selectedMonth', month, key])"
          />
        </template>

        <template v-if="isYearsShow" #slotYears>
          <CalendarDropdownItem
            v-for="year in props.years"
            v-bind:key="year.toString()"
            :selected="year.toString()"
            @click="openYearsOrMonthsDropdown(['selectedYear', year])"
          />
        </template>
      </CalendarDropdownContent>

      <p class="errorMessage"> {{ props.error }} </p>

    </div>
  </template>

  <template v-if="props.dropdownType === 'jobCategory' || props.dropdownType === 'englishLevel'">
    
    <div class="dropdownContainer categoryPosition">
      <label class="dropdownLabel">
          {{ label }}
      </label>

      <div
        class="dropdown longDropdown"
        @click="openYearsOrMonthsDropdown(['monthDropdown', 'monthDropdown'])"
      >
        <slot/>
        <img class="dropdown-icon" src="@/assets/svg/dropdown.svg"/>
      </div>

      <base-dropdown-content
          v-if="isDropdownOpen && props.dropdownType === 'jobCategory'"
          class="longeDropdown jobCategoryDropdown"
          v-click-away="onClickAway">

          <template #slotJobCategory>
            <base-dropdown-item
              v-for="category in jobCategories"
              v-bind:key="category"
              :selected="category"
              @click="updateDropdownValue( category, 'jobCategory' )"
              />
          </template>
      </base-dropdown-content>

      <base-dropdown-content
        v-if="isDropdownOpen && props.dropdownType === 'englishLevel'"
        class="longeDropdown"
        v-click-away="onClickAway">

        <template #slotEnglishLevel>
          <base-dropdown-item
            :selected="'No English'"
            @click="updateDropdownValue( 'No English', 'englishLevel' )"
          />
          <base-dropdown-item
            :selected="'Beginner/Elementary'"
            @click="updateDropdownValue( 'Beginner/Elementary', 'englishLevel' )"
          />
          <base-dropdown-item
            :selected="'Pre-Intermediate'"
            @click="updateDropdownValue( 'Pre-Intermediate', 'englishLevel' )"
          />
          <base-dropdown-item
            :selected="'Intermediate'"
            @click="updateDropdownValue( 'Intermediate', 'englishLevel' )"
          />
          <base-dropdown-item
            :selected="'Upper-Intermediate'"
            @click="updateDropdownValue( 'Upper-Intermediate', 'englishLevel' )"
          />
          <base-dropdown-item
            :selected="'Advanced/Fluent'"
            @click="updateDropdownValue( 'Advanced/Fluent', 'englishLevel' )"
          />
        </template>
      </base-dropdown-content>

    <p class="errorMessage"> {{ 'Required' }} </p>

  </div>
  </template>

</template>

<style scoped lang="scss">
  .dropdownContainer{
    display: flex;
    flex-direction: column;
    cursor: pointer;
    margin-bottom: 46px;
    margin-top: 34px;
  }

  .dropdown{
    height: 50px;
    background: $white;
    box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    text-align: left;
    outline: none;
    border: none;
    border: 1px solid $ultraLightGrey;
    padding-left: 16px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dropdownWidth184{
    width: 184px;
  }

  .dropdownWidth410{
    width: 410px;
  }

  .longeDropdown{
    width: 420px;
  }

  .jobCategoryDropdown{
    height: 420px;
  }

  .dropdown:focus {
  border: 1.5px solid $primary !important;
}

  .dropdown:hover {
    border: 1px solid $middleGrey;
  }

  .dropdownLabel{
    position: relative;
    margin-bottom: 16px;
    left: 16px;
    font-size: 14px;
    color: $grey;
    transition: .25s;
    pointer-events: none;
  }

  .dropdownLabelCalendar{
    position: absolute;
    top: -33px;
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
    margin-top: 57px;
    text-align: right;
    color: $error;
  }

  .categoryPosition{
    position: relative;
  }

</style>
