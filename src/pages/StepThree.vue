<script setup lang="ts">
import { ref } from "vue";

import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSlider from "@/components/BaseSlider.vue";

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const jobCategoryValue = ref("Select Job Category");
const englishLevelValue = ref("Select Your English Level");

const handleDropdown = (value, type) => {
  if (type === "jobCategory") {
    jobCategoryValue.value = value;
  } else {
    englishLevelValue.value = value;
  }
};
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

      <base-slider/>

      <base-dropdown
        :dropdown-type="'englishLevel'"
        :width="'longDropdown'"
        :label="'English Level'"
        :is-valid-dropdown="true"
        v-on:update:dropdownValue="handleDropdown"
      >
        <p
          :class="{
            dropdownTitleInitial: englishLevelValue === 'Select Your English Level',
          }"
          class="dropdownTitle"
        >
          {{ englishLevelValue }}
        </p>
      </base-dropdown>

      <base-input
        :input-props-value="''"
        class="input-long"
        type="text"
        label="skils"
        name="skils"
        v-on:update:is-valid="onChildValidation"
      />
    </form>
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
