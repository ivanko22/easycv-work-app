<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";
import { ref } from "vue";
import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";

// const { fillToken, fillConfig, fillMainCvId, fillMainCv } = useUserData();

// fillToken();
// fillConfig();
// fillMainCvId();
// fillMainCv();

// const { mainCV } = storeToRefs(useUserData());

// const jobs = mainCV;
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

  <div class="formContainer">
    <h1 class="title-tell-us">Tell Us About Yourself</h1>

    <base-wizzard :isRegistered="true" :experience="true"></base-wizzard>

    <base-form />
  </div>
</template>

<style scoped lang="scss">
.formContainer {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
}
</style>
