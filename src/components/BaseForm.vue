<script setup lang="ts">
import { ref, provide, computed } from 'vue'
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
const isJobEdit = ref(false)
const isAddJobFormShow = ref(false)
const isShowBaseJob = ref(true)

const selectedJobEdit = ref('')
const editJobID = ref()

const isFormValid = ref(false)
const addJobForm = ref()
const isJobValid = ref(false)

const isPrimaryBtnActive = ref(true)

const jobPositionValue = ref('')
const inputPreviousValue = ref('Fack')


const isJobPositionValid = ref()

const mainCVjobPositionValue = ref('')
const isMainCVjobPositionValid = ref()

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

  console.log('child validation', isValueValid, label, inputValue)

  if (label === 'position') {
    console.log('position', inputValue, jobPositionValue.value)
    isJobPositionValid.value = isValueValid
    jobPositionValue.value = inputValue
  }

  if (label === 'employer') {
    isEmployerValid.value = isValueValid
    employerValue.value = inputValue
  }

  // if (label === 'startDate') {
  //   console.log('startDate', inputValue, startDateValue.value)
  //   isStartDateValid.value = isValueValid
  //   startDateValue.value = inputValue
  // }

  // if (label === 'endDate') {
  //   console.log('endtDate', inputValue, endDateValue.value)

  //   isEndDateValid.value = isValueValid
  //   endDateValue.value = inputValue
  // }

  if (label === 'description') {
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

  console.log('childDate', date, label, isDateValid, dropdownLabel )

  if (label === 'startDate') {
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

const showHideForm = (arg, cvID, jobID) => {
  isJobEdit.value =  false
  isPrimaryBtnActive.value = !isPrimaryBtnActive.value

  if (arg === 'edit') {
    // inputPreviousValue.value = 'OMG'

    isJobEdit.value =  true
    isAddJobFormShow.value = false
    isShowBaseJob.value = false

    editJob(arg, cvID, jobID)
  }

  if (arg === 'add job') {
    isAddJobFormShow.value = true
    isJobEdit.value =  false
    isShowBaseJob.value = false

    console.log('add job!!!', isAddJobFormShow.value)
  }

  if (arg === 'add job cancel') {
    isAddJobFormShow.value = false
    isShowBaseJob.value = true
  }
}

// get ID of main CV
axios.get('/api/user', config)
  .then((response) => {
    mainUserCvId.value = response.data.cvs[0]
  })

// get main CV
const getMainCv = () => axios.get('/api/cv', config, mainUserCvId.value)
  .then((response) => {
    // console.log('Get main CV from remove JOb', response)
    jobs.value = response.data[0].workHistory
    // console.log('jobs', jobs.value[0]._id)

    // if (jobs.value.length < 1) {
    //     isJobEdit.value = true
    //   }

    })

getMainCv()

// edit Job Position
const editJob = (arg, cvID, jobID) => {

  for (let i = 0; i < jobs.value.length; i++) {

    const selectedJob = jobs.value[i];

    // console.log('selectedJob', selectedJob)

    if (selectedJob._id === jobID) {
      selectedJobEdit.value = selectedJob
      editJobID.value = jobID

      jobPositionValue.value = selectedJobEdit.value.position

      startDateLabel.value = formatMonth(new Date(selectedJobEdit.value.startDate).getMonth())+ ' ' + new Date(selectedJobEdit.value.startDate).getFullYear()
      endDateLabel.value = formatMonth(new Date(selectedJobEdit.value.endDate).getMonth())+ ' ' + new Date(selectedJobEdit.value.endDate).getFullYear()

      // console.log('this is selected job', selectedJobEdit.value, jobPositionValue.value)
      // console.log('selectedJobPosition', `${localStorage.getItem("selectedJobPosition")}`)
    }
    
  }
  console.log('edit job position from parrent', arg, cvID, jobID)

}

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

const onSubmit = (arg) => {
  const sendData = {
    position: jobPositionValue.value,
    employer: employerValue.value,
    startDate: new Date(startDateValue.value).toString(),
    endDate: new Date(endDateValue.value).toString(),
    description: descriptionValue.value
  }

  addJobForm.value.reset()

  jobPositionValue.value = ''
  jobCategoryValue.value = ''
  descriptionValue.value = ''
  endDateLabel.value = 'Select Date'
  startDateLabel.value = 'Select Date'

  if (arg === 'add') {
    // console.log('add', sendData, mainUserCvId.value)

    axios.post(`/api/cv/${mainUserCvId.value}/employment`, sendData, config)
    .then((response) => {
      console.log('add response', response, sendData)

      if (typeof (response.data) !== 'string') {
        isAddJobFormShow.value = false
        isShowBaseJob.value = true
        getMainCv()

        router.push('/step-two')
      }

    }) 
  }

  if (arg === 'update') {
    // console.log('updating job', sendData, editJobID.value, mainUserCvId.value)

    axios.put(`/api/cv/${mainUserCvId.value}/employment/${editJobID.value}`, sendData, config)    
    .then((response) => {

      console.log('response update job', response)

      if (typeof (response.data) !== 'string') {
        isAddJobFormShow.value = false
        isShowBaseJob.value = true

        getMainCv()

        router.push('/step-two')
      }

    }) 
    
  }
}

</script>

<template>

  <BaseJob
    v-show="isShowBaseJob"
    v-for="(job, index) in jobs"
    :cvID="mainUserCvId"
    :jobID="job._id"
    :jobTitle="job.position"
    :companyName="job.employer"
    :workPeriod="dateFormatation([job.startDate, job.endDate])"
    :jobDescription="job.description"
    v-on:update:jobs-list="getMainCv"
    v-on:update:editJobPositon="showHideForm"
  />

  <BaseSecondaryButton
    v-show="!isAddJobFormShow"
    icon="plus"
    @click="showHideForm('add job')"
    :disabled="isJobValid"
    type="submit"
    label="Add More Job"
  />

  <form ref="addJobForm" v-on:submit.prevent="onSubmit" class="signUpForm" autocomplete="off">

  <template v-if="isJobEdit">
    <div v-for="(value, key, index) in selectedJobEdit">
      <BaseInput v-if="index > 3 || index < 2"
        :input-props-value="value"
        name="job position"
        class="input-long" 
        type="text" 
        :label="key" 
        v-on:update:is-valid="onChildValidation"
        required 
      />

      <div v-if="index <= 0" class="group-dropdown">
        <base-dropdown
          v-on:update:currentPeriod="childDate"
          label="startDate"
          :isValidDropdown="isStartDateValid"
        >
          <p class="dropdown">{{ startDateLabel }}</p>
        </base-dropdown>

        <base-dropdown
          v-on:update:currentPeriod="childDate"
          label="endDate"
          :isValidDropdown="isEndDateValid"
          >
          <p class="dropdown">{{ endDateLabel }}</p>
        </base-dropdown>
      </div>

      <!-- <base-dropdown v-if="index > 1 && index < 4"
        v-on:update:currentPeriod="childDate"
        :label="key"
        :isValidDropdown="isStartDateValid"
      >
        <p class="dropdown">{{ startDateLabel }}</p>
      </base-dropdown> -->
    </div>

    <div class="secondBtnsContainer">
        <BaseSecondaryButton
          icon="plus"
          @click="showHideForm(false), onSubmit('update')"
          :disabled="isJobValid"
          type="submit"
          label="Save"
        />

        <BaseSecondaryButton
          icon="close"
          @click="showHideForm('add job cancel')"
          type="cancel"
          label="Cancel"
        />
      </div>
  </template>

    <template v-if="isAddJobFormShow">
      <p class="addJobTittle"> Add Job </p>

      <base-input
        :input-props-value="jobPositionValue"
        name="job position"
        class="input-long" 
        type="text" 
        label="position" 
        v-on:update:is-valid="onChildValidation"
        required 
      />

      <base-input
        :input-props-value="`${inputPreviousValue}`"
        class="input-long" 
        name="employer"
        type="text" 
        label="employer" 
        v-on:update:is-valid="onChildValidation"
        required 
        />  

        <div class="group-dropdown">

          <base-dropdown
            v-on:update:currentPeriod="childDate"
            label="startDate"
            :isValidDropdown="isStartDateValid"
          >
            <p class="dropdown">{{ startDateLabel }}</p>
          </base-dropdown>

          <base-dropdown
            v-on:update:currentPeriod="childDate"
            label="endDate"
            :isValidDropdown="isEndDateValid"
            >
            <p class="dropdown">{{ endDateLabel }}</p>
          </base-dropdown>

        </div>

        <base-input
          input-props-value="kjnkjnkjnkjnkj"
          class="input-long"
          type="text"
          label="description"
          name="description"
          v-on:update:is-valid="onChildValidation"
        />

        <div class="secondBtnsContainer">
          <BaseSecondaryButton
            icon="plus"
            @click="showHideForm(false), onSubmit('add')"
            :disabled="isJobValid"
            type="submit"
            label="Save"
          />

          <BaseSecondaryButton
            icon="close"
            @click="showHideForm('add job cancel')"
            type="cancel"
            label="Cancel"
          />
        </div>

    </template>
    
      
    </form>

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
