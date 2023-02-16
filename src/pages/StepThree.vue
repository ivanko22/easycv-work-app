<script setup lang="ts">
import { ref } from "vue";

import router from "@/router";
import axios from "axios";
import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import BaseSlider from "@/components/BaseSlider.vue";
import Chips from "@/components/chips/BaseChips.vue";
import BaseButton from "@/components/BaseButton.vue";

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const mainUserCvId = ref();

const jobCategoryValue = ref("Select Job Category");
const yearsExperience = ref();
const englishLevelValue = ref("Select Your English Level");
const skills = ref();

const isActivePrimaryBtn = ref(true);

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user")}`,
  },
};

// get ID of main CV
axios.get("/api/user", config).then((response) => {
  mainUserCvId.value = response.data.cvs[0];
});

const getSkills = (emitedSkills) => {
  skills.value = emitedSkills;
};

const handleDropdown = (value, type) => {
  if (type === "jobCategory") {
    jobCategoryValue.value = value;
  } else {
    englishLevelValue.value = value;
  }
};

const handleSlider = (value) => {
  yearsExperience.value = value;
};

const onSubmit = () => {
  const sendData = {
    cv: mainUserCvId.value,
    jobCategory: jobCategoryValue.value,
    experience: yearsExperience.value,
    skills: skills.value,
  };

  axios.put("/api/cv", sendData, config).then((response) => {
    console.log("response", response);
  });
};

//need to add English level on API
</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />

  <header-main label="Sign Out" hrefUrl="/logout" />

  <div class="stepThreeForm">
    <h1 class="title-tell-us">Tell Us About Yourself</h1>

    <base-wizzard
      :skills="true"
      :isRegistered="true"
      :isExperienced="true"
      :isSkilled="false"
    />

    <form v-on:submit.prevent="onSubmit" autocomplete="off">
      <base-dropdown
        :dropdown-type="'jobCategory'"
        :width="'longDropdown'"
        :label="'Job Category'"
        :is-valid-dropdown="true"
        v-on:update:dropdownValue="handleDropdown"
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
        v-on:update:dropdownValue="handleDropdown"
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

    <base-button
      label="Next"
      :class="{ primaryBtn: isActivePrimaryBtn }"
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
  height: 80vh;
}

.dropdownTitle {
  font-weight: 500;
}

.dropdownTitleInitial {
  font-weight: 400;
  color: $grey;
}
</style>
