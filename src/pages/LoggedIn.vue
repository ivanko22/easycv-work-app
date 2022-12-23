<script setup lang="ts">
import { ref } from "vue";
import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";
import BaseButton from "@/components/BaseButton.vue";

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

  <header-main label="Sign Out" hrefUrl="/logout" />

  <div class="formContainer">
    <h1 class="title-tell-us">Tell Us About Yourself</h1>

    <base-wizzard :isRegistered="true" :experience="true"></base-wizzard>

    <base-form></base-form>
    <base-button
      label="Next"
      :class="{ primaryBtn: isFormValid }"
      type="submit"
    />
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
