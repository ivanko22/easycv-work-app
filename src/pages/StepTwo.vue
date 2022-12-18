<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

import HeaderMain from "@/components/HeaderMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";
// import BaseJob from '@/components/dropdown/BaseJob.vue'
import BaseForm from "@/components/BaseForm.vue";

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const isShowForm = ref(false);

const isFormValid = ref(true);
const isJobValid = ref(true);

const mainUserCvId = ref();

const jobs = ref([]);

// const showHideForm = () => {
//   isShowForm.value = !isShowForm.value
// console.log('isShowForm.value', isShowForm.value)
// }

// get ID of main CV
// axios.get('api/user')
//   .then((response) => {
//     // console.log('response.data user', response.data, response.data.cvs[0])
//     mainUserCvId.value = response.data.cvs[0]
//   })

// get main CV
const getMainCv = () =>
  axios.get("api/cv").then((response) => {
    jobs.value.push(response.data.cvs[0]);
  });

getMainCv();

// const getListOfJob = (jobList) => {
// console.log('jobList', jobList, jobList._rawValue[0])
// console.log('jobList[0]', jobList[0])
// console.log('typeof (jobList)', typeof (jobList))
// };

const primaryBtnStatus = (status) => {
  console.log(status, "primaryBtnStatus");
};
</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />
  <header-main label="Log Out" hrefUrl="api/logout" />

  <div class="stepTwoForm">
    <h1 class="title-tell-us">Tell Us About Yourself</h1>

    <base-wizzard
      :isRegistered="true"
      :experience="true"
      :isExperienced="true"
    ></base-wizzard>

    <base-form v-on:update:jobsList="getListOfJob" />

    <base-button
      v-on:update:primaryBtnStatus="primaryBtnStatus"
      label="Next"
      :class="{ primaryBtn: isFormValid }"
      type="submit"
    />
  </div>
</template>

<style scoped lang="scss">
.stepTwoForm {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  height: 80vh;
}

.addNextJobBtnContainer {
  display: flex;
  width: 160px;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
}

.addJobBtnTitle {
  padding-left: 10px;
}
.plusIcon {
  fill: $primary;
  color: $primary;
  cursor: pointer;
}
</style>
