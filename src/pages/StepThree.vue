<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";
import { defineProps, ref } from "vue";
import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseSlider from "@/components/BaseSlider.vue";
import Chips from "@/components/chips/BaseChips.vue";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";

const { fillToken, fillConfig, fillMainCvId, fillMainCv, fillJob, addJob, removeJob, updateCv } =
  useUserData();

fillToken();
fillConfig();
fillMainCvId();
fillMainCv();

const { mainCVid, mainCV, showCTAbtn, config } = storeToRefs(useUserData());
const isShowPrimaryBtn = ref(false);

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const jobTitleValue = ref('');
const jobCategoryValue = ref("Select Job Category");
const yearsExperience = ref();
const englishLevelValue = ref("Select Your English Level");
const skills = ref();

const getSkills = (emitedSkills) => {
  skills.value = emitedSkills;
  handlePrimaryBtn();
};

const handleDropdownInput = (value, type) => {
  if (type === "jobCategory") {
    jobCategoryValue.value = value;
  }

  if(type === "Job Title"){
    console.log('job title', value);
    jobTitleValue.value = value;
  }
  
  if(type === "englishLevel") {
    englishLevelValue.value = value;
  }

  handlePrimaryBtn();
};

const handleSlider = (value) => {
  yearsExperience.value = value;
  handlePrimaryBtn();
};

const handlePrimaryBtn = () => {
  if (
    jobCategoryValue.value !== "Select Job Category" && 
    yearsExperience.value && 
    englishLevelValue.value !== "Select Your English Level" && skills.value
    ) {
    isShowPrimaryBtn.value = true;
  }else{
    isShowPrimaryBtn.value = false;
  }
}

const onSubmit = () => {
  const sendData = {
    cv: mainCVid.value,
    jobTitle: jobTitleValue.value,
    jobCategory: jobCategoryValue.value,
    experience: yearsExperience.value,
    skills: skills.value,
    languages: [{
      language: "English", 
      level: englishLevelValue.value}]
  };

  if (isShowPrimaryBtn.value) {
    updateCv(sendData);
    router.push('/dashboard');
  }
};

</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />

  <header-main label="Log Out" hrefUrl="/logout" />

  <div class="stepThreeForm">
    <h1 class="title-tell-us">Tell Us About Yourself</h1>

    <base-wizzard
      :skills="true"
      :isRegistered="true"
      :isExperienced="true"
      :isSkilled="false"
    />

    <form v-on:submit.prevent="onSubmit" autocomplete="off">

      <BaseInput 
        :label="'Job Title'"
        :type="'text'"
        v-on:update:typeValue="handleDropdownInput"
      />

      <base-dropdown
        class="margin-top0"
        :dropdown-type="'jobCategory'"
        :width="'longDropdown'"
        :label="'Job Category'"
        :is-valid-dropdown="true"
        v-on:update:dropdownValue="handleDropdownInput"
      >
        <p
          :class="{
            dropdownTitleInitial: jobCategoryValue === 'Select Job Category',
          }"
          class="dropdownTitle"
        >
          {{ jobCategoryValue }}
        </p>
      </base-dropdown>

      <base-slider v-on:update:sliderValue="handleSlider" />

      <base-dropdown
        :dropdown-type="'englishLevel'"
        :width="'longDropdown'"
        :label="'English Level'"
        :is-valid-dropdown="true"
        v-on:update:dropdownValue="handleDropdownInput"
      >
        <p
          :class="{
            dropdownTitleInitial:
              englishLevelValue === 'Select Your English Level',
          }"
          class="dropdownTitle"
        >
          {{ englishLevelValue }}
        </p>
      </base-dropdown>

      <chips v-on:update:skills="getSkills" />
    </form>

    <BaseButton
      label="Next"
      :class="{ primaryBtn: isShowPrimaryBtn }"
      @click="onSubmit"
    />
  </div>
</template>

<style scoped lang="scss">
.stepThreeForm {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
}

.dropdownTitle {
  font-weight: 500;
}

.dropdownTitleInitial {
  font-weight: 400;
  color: $grey;
}

.margin-top0{
  margin-top: 0;
}
</style>
