<script setup lang="ts">
import { defineEmits, ref, provide, computed } from 'vue'
import router from '@/router'
import axios from 'axios'
import BaseInput from '@/components/BaseInput.vue'
import BaseDropdown from '@/components/dropdown/BaseDropdown.vue'
import BaseSecondaryButton from '@/components/BaseSecondaryButton.vue'
import BaseJob from './dropdown/BaseJob.vue'

const mainUserCvId = ref()

const selectedPeriod = ref(['Start Date', 'End Date'])
provide('selectedPeriod', computed(() => selectedPeriod.value))

const jobs = ref([])

const isFormValid = ref(false)
const addJobForm = ref()
const isJobValid = ref(false)

const isPrimaryBtnActive = ref(true)

const isShowForm = ref(true)

const jobPositionValue = ref('')
const isJobPositionValid = ref()

const jobCategoryValue = ref('')
const isJobCategoryValid = ref()

const experienceValue = ref(0)
const isExperienceValid = ref()

const skillsValue = ref([''])
const isSkillsValid = ref()

const employerValue = ref()
const isEmployerValid = ref()

const startDateLabel = ref('Start Date')
const startDateValue = ref()
const isStartDateValid = ref(true)

const endDateLabel = ref('End Date')
const endDateValue = ref()
const isEndDateValid = ref(true)

const descriptionValue = ref()
const isDescriptonValid = ref()

const newEmployerValue = ref(true)

const onChildValidation = (isValueValid, label, inputValue) => {
  if (label === 'Job Position') {
    isJobPositionValid.value = isValueValid
    jobPositionValue.value = inputValue
  }

  if (label === 'Employer') {
    isEmployerValid.value = isValueValid
    employerValue.value = inputValue
  }

  if (label === 'Start Date') {
    isStartDateValid.value = isValueValid
    startDateValue.value = inputValue
  }

  if (label === 'End Date') {
    isEndDateValid.value = isValueValid
    endDateValue.value = inputValue
  }

  if (label === 'Description') {
    isDescriptonValid.value = isValueValid
    descriptionValue.value = inputValue

    if (startDateValue.value === 'Start Date') {
      isStartDateValid.value = false
    } else {
      isStartDateValid.value = true
    }

    if (endDateValue.value === 'End Date') {
      isEndDateValid.value = false
    } else {
      isEndDateValid.value = true
    }
  }

  isJobValid.value = jobValdiation()

}

const jobValdiation = () => {
  if (
    isJobPositionValid.value &&
        isEmployerValid.value &&
        isStartDateValid.value &&
        isEndDateValid.value &&
        isDescriptonValid.value
  ) {

    return true
  } else {
    return false
  }
}

// const formValidation = () => {
//   if (
//     isJobPositionValid.value &&
//     isEmployerValid.value &&
//     isStartDateValid.value &&
//     isEndDateValid.value &&
//     isDescriptonValid.value
//   ) {
//     return true
//   } else {
//     return false
//   }
// }

const childDate = (date, label, isDateValid, dropdownLabel) => {
  if (label === 'Start Date') {
    isStartDateValid.value = isDateValid
    startDateLabel.value = dropdownLabel
    startDateValue.value = date
  } else {
    isEndDateValid.value = isDateValid
    endDateLabel.value = dropdownLabel
    endDateValue.value = date
  }
}

const onClickAway = (event: any) => {
  // isMonthsShow.value = false
  // isYearsShow.value = false
  // isDropdownOpen.value = false
}

const config = {
  headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("user")}`
  }
};

const showHideForm = (arg) => {
  isShowForm.value = arg
  isPrimaryBtnActive.value = !isPrimaryBtnActive.value
}

// get ID of main CV
axios.get('/api/user', config)
  .then((response) => {
    console.log('response.data user from form', response)
    mainUserCvId.value = response.data.cvs[0]
  })

// get main CV
const getMainCv = () => axios.get('/api/cv', config)
  .then((response) => {
    jobs.value = response.data.cvs[0]
  })

getMainCv()

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

const formatMonth = (month) => {
  return months[month]
}

const dateFormatation = (date) => {
  const startDate = new Date(date[0])
  const endDate = new Date(date[1])

  const period = `${formatMonth(startDate.getMonth() - 1)} ${startDate.getFullYear()} - ${formatMonth(endDate.getMonth() - 1)} ${endDate.getFullYear()}`
  return period
}

const onSubmit = () => {
  const sendData = {
    cv: mainUserCvId.value,
    jobTitle: jobPositionValue.value,
    jobCategory: jobCategoryValue.value,
    experience: experienceValue.value,
    skills: skillsValue.value,
    newEmployment: [{
      employer: employerValue.value,
      newEmployer: newEmployerValue.value,
      startDate: new Date(startDateValue.value).toString(),
      endDate: new Date(endDateValue.value).toString(),
      description: descriptionValue.value
    }]
  }

  addJobForm.value.reset()

  jobPositionValue.value = ''
  jobCategoryValue.value = ''
  descriptionValue.value = ''
  endDateLabel.value = 'Select Date'
  startDateLabel.value = 'Select Date'

  axios.put('/api/cv', sendData, config)

    .then((response) => {

      if (typeof (response.data) !== 'string') {
        isShowForm.value = false
        getMainCv()
        updateListOfJob()
        router.push('/step-two')
      }

    })
}

const emit = defineEmits<{(e: 'update:jobsList', value: object): void;}>()

const updateListOfJob = () => {
  emit('update:jobsList', jobs)
}

</script>

<template>

  <BaseJob
    v-for="(job, index) in jobs.workHistory"
    :key="job.id"
    :jobTitle="jobs.jobTitle"
    :companyName="jobs.workHistory[index].employer.name"
    :workPeriod="dateFormatation([jobs.workHistory[index].startDate, jobs.workHistory[index].endDate])"
  />

  <BaseSecondaryButton
    v-show="!isShowForm"
    icon="plus"
    @click="showHideForm(true)"
    :disabled="isJobValid"
    type="submit"
    label="Add More Job"
  />

  <form ref="addJobForm" v-show="isShowForm"  v-on:submit.prevent="onSubmit" class="signUpForm" autocomplete="off">
    <p class="addJobTittle"> Add Job </p>

    <base-input class="input-long" type="text" label="Job Position" name="jobPosition" v-on:update:is-valid="onChildValidation"
      required />

    <base-input class="input-long" type="text" label="Employer" name="employer" v-on:update:is-valid="onChildValidation"
      required />

    <div class="group-dropdown">

      <base-dropdown
        v-on:update:currentPeriod="childDate"
        label="Start Date"
        :isValidDropdown="isStartDateValid"
      >
        <p class="dropdown">{{ startDateLabel }}</p>
      </base-dropdown>

      <base-dropdown
        v-on:update:currentPeriod="childDate"
        label="End Date"
        :isValidDropdown="isEndDateValid"
        >
        <p class="dropdown">{{ endDateLabel }}</p>
      </base-dropdown>

    </div>

    <base-input
      class="input-long"
      type="text"
      label="Description"
      name="description"
      v-on:update:is-valid="onChildValidation"
    />

  </form>

  <div class="secondBtnsContainer">
    <BaseSecondaryButton
      v-show="isShowForm"
      icon="plus"
      @click="showHideForm(false), onSubmit()"
      :disabled="isJobValid"
      type="submit"
      label="Add Job"
    />

    <BaseSecondaryButton
      v-show="isShowForm"
      icon="close"
      @click="showHideForm(false)"
      type="cancel"
      label="Cancel"
    />
  </div>

</template>

<style scoped lang="scss">
  button:disabled{
    cursor: default;
  }

  h1{
    text-align: center;
  }

  .signUpForm {
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
  }

  .title-tell-us {
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 10px;
  }

  .firstlastName {
    display: flex;
    width: 420px;
    justify-content: space-around;
  }

  .input-container-dropdown{
    position: relative;
  }

  .group-dropdown{
    display: flex;
    width: 420px;
    height: 90px;
    margin-bottom: 14px;
    justify-content: space-around;
  }

  .addJobBtnContainer{
    display: flex;
    width: 160px;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
  }

  .addJobBtnTitle{
    font-weight: 600;
    font-size: 14px;
    padding-left: 10px;
    color: $lightGrey2;
  }

  .plusIcon{
    fill: $primary;
    color: $primary;
    cursor: pointer;
  }

  .addJobTittle{
    font-weight: 600;
    font-size: 18px;
    color: $black;
    text-align: left;
    width: 100%;
    padding-left: 28px;
  }

  .secondBtnsContainer{
    display: flex;
  }

</style>
