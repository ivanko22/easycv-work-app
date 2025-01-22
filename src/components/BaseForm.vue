<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";
import { dateFormatation, formatMonth } from "@/helpers/dateFormat";
import { ref, provide, computed, onMounted, toRaw } from "vue";
import router from "@/router";
import { addJob, updateJob, removeJob } from "@/services/jobs";

import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import BaseSecondaryButton from "@/components/BaseSecondaryButton.vue";
import BaseJob from "./BaseJob.vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps<{
    isJobEdit: false,
}>()

const userStore = useUserData();
const { jobs, showCTAbtn } = storeToRefs(userStore);
const selectedJob = ref("");
const selectedJobID = ref("");

onMounted(() => {
  userStore.fillJobs();
});

const isShowPrimaryBtn = computed(() => showCTAbtn.value);

console.log('Jobs from step 2', jobs);

const isFormShow = ref(false);
const formTitle = ref("");
const isJobValid = ref(false);
const jobPositionValue = ref("");
const employerValue = ref("");
const startDateValue = ref("");
const endDateValue = ref("");
const descriptionValue = ref("");
const errorMessage = ref("");

const resetForm = () => {
  jobPositionValue.value = "";
  employerValue.value = "";
  descriptionValue.value = "";
  startDateValue.value = "";
  endDateValue.value = "";
  errorMessage.value = "";
  isJobValid.value = false;
};

const selectedPeriod = ref(["Start Date", "End Date"]);
const years = ref([2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);

provide(
  "selectedPeriod",
  computed(() => selectedPeriod.value)
);

const isJobEdit = ref(false);
const isAddJobFormShow = ref(false);
const isShowBaseJob = ref(true);
const selectedJobEdit = ref("");
const editJobID = ref();
const addJobForm = ref();
const isJobPositionValid = ref();
const isEmployerValid = ref();
const startDateLabel = ref("Start Date");
const isStartDateValid = ref(false);
const endDateLabel = ref("End Date");
const isEndDateValid = ref(false);
const isDescriptonValid = ref();

const baseButtonHandler = () => {
  if (jobs.value.length > 0) {
    router.push("/step-three");
  }
}

const onChildValidation = (isValueValid, label, inputValue) => {
  if (label === "position") {
    isJobPositionValid.value = isValueValid;
    jobPositionValue.value = inputValue;

    console.log('jobPositionValue.value', jobPositionValue.value, isValueValid);
  }
  else if(label === "employer") {
    isEmployerValid.value = isValueValid;
    employerValue.value = inputValue;
  }
  else if(label === "description") {
    isDescriptonValid.value = isValueValid;
    descriptionValue.value = inputValue;
  }

  isJobValid.value = jobValdiation();
};

const jobValdiation = () => {
  if (
    isJobPositionValid.value &&
    isEmployerValid.value &&
    isStartDateValid.value &&
    isEndDateValid.value &&
    isDescriptonValid.value
  ) {
    return true;
  } else {
    return false;
  }
};

const compareDates = () => {
  if (startDateValue.value < endDateValue.value) {
    isStartDateValid.value = true;
    errorMessage.value = '';
  } else if (startDateValue.value > endDateValue.value) {
    isStartDateValid.value = false;
    errorMessage.value = 'The start date bigger then end date';
  } else if (startDateValue.value === endDateValue.value) {
    isStartDateValid.value = false;
    isEndDateValid.value = false;
    errorMessage.value = 'Both dates are the same';
  }
}

const childDate = (date, label, isDateValid, dropdownValue) => {
    if (label === "startDate") {
    isStartDateValid.value = isDateValid;
    startDateLabel.value = dropdownValue;
    startDateValue.value = date;

    compareDates()
  } 
  
    else if (label === "endDate") {
    isEndDateValid.value = isDateValid;
    endDateLabel.value = dropdownValue;
    endDateValue.value = date;

    compareDates()
  }
};

const getJobByID = (jobID) => {
  const jobsArray = toRaw(jobs.value);

  const targetJob = jobsArray.find((job) => job.id === jobID);
    if (targetJob.id === jobID) {

      jobPositionValue.value = targetJob.position;
      employerValue.value = targetJob.employer;
      descriptionValue.value = targetJob.description;

      startDateLabel.value =
        formatMonth(new Date(targetJob.startDate).getMonth()) +
        " " +
        new Date(targetJob.startDate).getFullYear();

      endDateLabel.value =
        formatMonth(new Date(targetJob.endDate).getMonth()) +
        " " +
        new Date(targetJob.endDate).getFullYear();

      selectedJobID.value = jobID;

      selectedJob.value = targetJob;

      return
    } else {
      console.log(`Job with ID ${jobID} not found`);
  }
};

const showHideForm = async (arg) => {
  isJobEdit.value = false;

  if (arg.arg === "Edit Job") {
    isJobEdit.value = true;
    isAddJobFormShow.value = false;
    formTitle.value = "Edit Job";
    isFormShow.value = true;
    isShowPrimaryBtn.value = false;

    getJobByID(arg.jobID);
  }

  if (arg === "Add Job") {
    formTitle.value = "Add Job";
    isFormShow.value = true;
    startDateLabel.value = "Start Date";
    endDateLabel.value = "End Date";
    isShowPrimaryBtn.value = false;
  }

  if (arg === "add job cancel") {
    isFormShow.value = false;
    jobPositionValue.value = "";
    employerValue.value = "";
    descriptionValue.value = "";
    endDateLabel.value = "Select Date";
    startDateLabel.value = "Select Date";
    isJobEdit.value = false;
    isJobValid.value = false;
    isShowPrimaryBtn.value = true;
  }

  if (arg.arg === "Remove Job") {
    const response = await removeJob(arg.jobID);
    userStore.jobs = response;
  }

};

const onSubmit = async (arg) => {
  if (isShowPrimaryBtn.value || isJobValid.value || jobs.value.length > 0) {
    const sendData = {
      position: jobPositionValue.value,
      employer: employerValue.value,
      startDate: startDateValue.value.toString(),
      endDate: endDateValue.value.toString(),
      description: descriptionValue.value,
    };

    addJobForm.value.reset();

    if (arg === "Add Job") {
      try {
        const response = await addJob(sendData);
        userStore.jobs = response;

        resetForm();

      } catch (error) {
        console.error("Add Job failed:", error);
      }

      isAddJobFormShow.value = false;
      isShowBaseJob.value = true;
      isFormShow.value = false;
      isJobValid.value = false;
    }

    if (arg === "Edit Job") {

      try {
        const response = await updateJob(sendData, selectedJobID.value);
        userStore.jobs = response;

        resetForm();

      } catch (error) {
        console.error("Update Job failed:", error);
      }

      isAddJobFormShow.value = false;
      isShowBaseJob.value = true;
      isFormShow.value = false;
      isShowPrimaryBtn.value = true;
      isJobValid.value = false;
    }
  }
};

</script>

<template>
  <template v-if="!isFormShow">
    <BaseJob
      v-for="(job, index) in jobs"
      :cvJobEdit="props.isJobEdit"
      :jobID="job.id"
      :jobTitle="job.position"
      :companyName="job.employer"
      :key="index"
      :workPeriod="dateFormatation([job.startDate, job.endDate])"
      :jobDescription="job.description"
      v-on:update:jobs-list="jobs"
      v-on:update:editJobPositon="showHideForm"
    />

    <BaseSecondaryButton
      icon="plus"
      @click="showHideForm('Add Job')"
      :disabled="true"
      type="submit"
      label="Add Job"
    />
  </template>

  <form
    ref="addJobForm"
    v-on:submit.prevent="onSubmit"
    class="signUpForm"
    autocomplete="off"
  >
    <template v-if="isFormShow">
      <p class="addJobTittle">{{ formTitle }}</p>

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
        :input-props-value="employerValue"
        class="input-long"
        name="employer"
        type="text"
        label="employer"
        v-on:update:is-valid="onChildValidation"
        required
      />

      <div class="group-dropdown">
        <base-dropdown
          :dropdownType="'calendar'"
          :width="'shortDropdown'"
          v-on:update:currentPeriod="childDate"
          :label="'startDate'"
          :years="years"
          :error="errorMessage"
        >
          <p class="dropdown">{{ startDateLabel }}</p>
        </base-dropdown>

        <base-dropdown
          :dropdownType="'calendar'"
          :width="'shortDropdown'"
          v-on:update:currentPeriod="childDate"
          :label="'endDate'"
          :years="years"
        >
          <p class="dropdown">{{ endDateLabel }}</p>
        </base-dropdown>
      </div>

      <base-input
        :input-props-value="descriptionValue"
        class="input-long"
        type="text"
        label="description"
        name="description"
        v-on:update:is-valid="onChildValidation"
      />

      <div class="secondBtnsContainer">
        <BaseSecondaryButton
          icon="plus"
          @click="onSubmit(formTitle)"
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

  <BaseButton
    v-if="!isJobEdit"
    label="Next"
    :class="{ primaryBtn: isShowPrimaryBtn }"
    type="submit"
    @click="baseButtonHandler()"
  />
</template>

<style scoped lang="scss">
button:disabled {
  cursor: default;
}

h1 {
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

.input-container-dropdown {
  position: relative;
}

.group-dropdown {
  display: flex;
  width: 410px;
  height: 90px;
  margin-bottom: 40px;
  justify-content: space-around;
}

.addJobBtnContainer {
  display: flex;
  width: 160px;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
}

.addJobBtnTitle {
  font-weight: 600;
  font-size: 14px;
  padding-left: 10px;
  color: var(--primary);
}

.plusIcon {
  fill: var(--primary);
  color: var(--primary);
  cursor: pointer;
}

.addJobTittle {
  font-weight: 600;
  font-size: 18px;
  color: var(--black);
  text-align: left;
  width: 100%;
  padding-left: 28px;
}

.secondBtnsContainer {
  display: flex;
}
</style>
