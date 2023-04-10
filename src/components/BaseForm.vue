<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";
import { dateFormatation } from "@/helpers/dateFormat";
import { ref, provide, computed } from "vue";
import router from "@/router";
import axios from "axios";
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import BaseSecondaryButton from "@/components/BaseSecondaryButton.vue";
import BaseJob from "./BaseJob.vue";
import BaseButton from "@/components/BaseButton.vue";

const { fillToken, fillConfig, fillMainCvId, fillMainCv, fillJob, addJob, removeJob } =
  useUserData();

fillToken();
fillConfig();
fillMainCvId();
fillMainCv();

const { mainCVid, jobs, showCTAbtn } = storeToRefs(useUserData());

const isShowPrimaryBtn = showCTAbtn;

const selectedPeriod = ref(["Start Date", "End Date"]);
provide(
  "selectedPeriod",
  computed(() => selectedPeriod.value)
);

const isJobEdit = ref(false);
const isAddJobFormShow = ref(false);
const isShowBaseJob = ref(true);

const selectedJobEdit = ref("");
const editJobID = ref();

const isFormShow = ref(false);
const formTitle = ref("");
const addJobForm = ref();
const isJobValid = ref(false);

const jobPositionValue = ref("");
const isJobPositionValid = ref();

const employerValue = ref("");
const isEmployerValid = ref();

const startDateLabel = ref("Start Date");
const startDateValue = ref();
const isStartDateValid = ref(false);
const endDateLabel = ref("End Date");
const endDateValue = ref();
const isEndDateValid = ref(false);

const descriptionValue = ref("");
const isDescriptonValid = ref();

const onChildValidation = (isValueValid, label, inputValue) => {
  if (label === "position") {
    isJobPositionValid.value = isValueValid;
    jobPositionValue.value = inputValue;
  }

  if (label === "employer") {
    isEmployerValid.value = isValueValid;
    employerValue.value = inputValue;
  }

  if (label === "description") {
    isDescriptonValid.value = isValueValid;
    descriptionValue.value = inputValue;

    if (startDateValue.value === "Start Date") {
      isStartDateValid.value = false;
    } else {
      isStartDateValid.value = true;
    }

    if (endDateValue.value === "End Date") {
      isEndDateValid.value = false;
    } else {
      isEndDateValid.value = true;
    }
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

const childDate = (date, label, isDateValid, dropdownLabel) => {
  if (label === "startDate") {
    isStartDateValid.value = isDateValid;
    startDateLabel.value = dropdownLabel;
    startDateValue.value = date;
  } else {
    isEndDateValid.value = isDateValid;
    endDateLabel.value = dropdownLabel;
    endDateValue.value = date;
  }
};

const showHideForm = (arg, cvID, jobID) => {
  isJobEdit.value = false;

  if (arg === "Edit Job") {
    isJobEdit.value = true;
    isAddJobFormShow.value = false;
    formTitle.value = "Edit Job";
    isFormShow.value = true;
    isShowPrimaryBtn.value = false;

    editJob(arg, cvID, jobID);
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
  }

  if (arg === "Remove Job") {
    removeJob(arg, cvID, jobID)
  }

};

// edit Job Position
const editJob = (arg, cvID, jobID) => {
  for (let i = 0; i < jobs.value.length; i++) {
    const selectedJob = jobs.value[i];

    if (selectedJob._id === jobID) {
      selectedJobEdit.value = selectedJob;
      editJobID.value = jobID;
      jobPositionValue.value = selectedJobEdit.value.position;
      employerValue.value = selectedJobEdit.value.employer;
      descriptionValue.value = selectedJobEdit.value.description;

      startDateLabel.value =
        formatMonth(new Date(selectedJobEdit.value.startDate).getMonth()) +
        " " +
        new Date(selectedJobEdit.value.startDate).getFullYear();

      endDateLabel.value =
        formatMonth(new Date(selectedJobEdit.value.endDate).getMonth()) +
        " " +
        new Date(selectedJobEdit.value.endDate).getFullYear();
    }
  }
};

const onSubmit = (arg) => {
  const sendData = {
    position: jobPositionValue.value,
    employer: employerValue.value,
    startDate: new Date(startDateValue.value).toString(),
    endDate: new Date(endDateValue.value).toString(),
    description: descriptionValue.value,
  };

  addJobForm.value.reset();

  jobPositionValue.value = "";
  employerValue.value = "";
  descriptionValue.value = "";
  endDateLabel.value = "Select Date";
  startDateLabel.value = "Select Date";

  if (arg === "Add Job") {
    addJob(sendData);
    isAddJobFormShow.value = false;
    isShowBaseJob.value = true;
    isFormShow.value = false;
  }

  if (arg === "Edit Job") {
    fillJob(sendData, editJobID.value);
    isAddJobFormShow.value = false;
    isShowBaseJob.value = true;
    isFormShow.value = false;
  }
};

</script>

<template>
  <template v-if="!isFormShow">
    <BaseJob
      v-for="(job, index) in jobs"
      :cvID="mainCVid"
      :jobID="job._id"
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
      :disabled="isJobValid"
      type="submit"
      label="Add Another Job"
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
          :isValidDropdown="isStartDateValid"
        >
          <p class="dropdown">{{ startDateLabel }}</p>
        </base-dropdown>

        <base-dropdown
          :dropdownType="'calendar'"
          :width="'shortDropdown'"
          v-on:update:currentPeriod="childDate"
          :label="'endDate'"
          :isValidDropdown="isEndDateValid"
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

  <base-button
    label="Next"
    :class="{ primaryBtn: isShowPrimaryBtn }"
    type="submit"
    @click="router.push('/step-three')"
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
  margin-bottom: 14px;
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
  color: $lightGrey;
}

.plusIcon {
  fill: $primary;
  color: $primary;
  cursor: pointer;
}

.addJobTittle {
  font-weight: 600;
  font-size: 18px;
  color: $black;
  text-align: left;
  width: 100%;
  padding-left: 28px;
}

.secondBtnsContainer {
  display: flex;
}
</style>
