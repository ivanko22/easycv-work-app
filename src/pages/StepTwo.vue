<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

import HeaderMain from "@/components/HeaderMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";
import BaseForm from "@/components/BaseForm.vue";

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const isShowPrimaryBtn = ref(false);
const isFormValid = ref(true);

const showHidePrimaryBtn = (state) => {
  console.log("primary button status", state);
  isShowPrimaryBtn.value = state;
};
</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />

  <header-main label="Sign Out" hrefUrl="/logout" />

  <div class="stepTwoForm">
    <h1 class="title-tell-us">Tell Us About Yourself</h1>

    <base-wizzard
      :isRegistered="true"
      :experience="true"
      :isExperienced="false"
    />

    <base-form v-on:update:primaryBtnStatus="showHidePrimaryBtn" />

    <base-button
      v-if="isShowPrimaryBtn"
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
