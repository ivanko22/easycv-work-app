<script setup lang="ts">
import { ref } from "vue";

import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import BaseInput from "@/components/BaseInput.vue";

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const drodownJobCategory = ref("Select Job Category");
const isOpen = ref(false);

const handleDropdownCategory = (arg) => {
  console.log("handleDropdownCategory", arg);
  drodownJobCategory.value = arg;
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
      :isRegistered="true"
      :experience="true"
      :isExperienced="true"
    />

    <form v-on:submit.prevent="onSubmit" autocomplete="off">
      <base-dropdown
        @click="isOpen = !isOpen"
        :isOpen="isOpen"
        :dropdown-type="'jobCategory'"
        :width="'longDropdown'"
        :label="'Job Category'"
        :is-valid-dropdown="true"
        v-on:update:selected-job-category="handleDropdownCategory"
      >
        <p>{{ drodownJobCategory }}</p>
      </base-dropdown>

      <base-dropdown
        :dropdown-type="'englishLevel'"
        :width="'longDropdown'"
        label="English Level"
        :is-valid-dropdown="true"
      >
        <p class="dropdown">Level of English</p>
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
</style>
