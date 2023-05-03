<script setup lang="ts">
import { ref } from "vue";

import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseForm from "@/components/BaseForm.vue";

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />

  <header-main label="Log Out" hrefUrl="/logout" />

  <div class="stepTwoForm">
    <h1 class="title-tell-us">Edit Job</h1>

    <base-form :editJob="true"/>
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
