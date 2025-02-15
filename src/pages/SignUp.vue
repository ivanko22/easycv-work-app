<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { signUp } from "@/services/auth";

import HeaderMain from "@/components/HeaderMain.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import BaseWizzard from "@/components/wizzard/BaseWizzard.vue";

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const isFormValid = ref(false);

const isGivenNameValid = ref(false);
const nameValue = ref();

const isLastNameValid = ref(false);
const lastNameValue = ref();

const isEmailValid = ref(false);
const emailValue = ref();

const isPasswordValid = ref(false);
const passwordValue = ref();
const passwordShow = ref(false);

const onChildValidation = (isValueValid, label, inputValue, IsPasswordShow) => {
  if (label === "Given Name") {
    isGivenNameValid.value = isValueValid;
    nameValue.value = inputValue;
  }
  if (label === "Last Name") {
    isLastNameValid.value = isValueValid;
    lastNameValue.value = inputValue;
  }

  if (label === "Email") {
    isEmailValid.value = isValueValid;
    emailValue.value = inputValue;
  }
  if (label === "Password") {
    isPasswordValid.value = isValueValid;
    passwordValue.value = inputValue;
    passwordShow.value = IsPasswordShow;
  }

  isFormValid.value = formValidation();
};

const formValidation = () => {
  if (
    isGivenNameValid.value &&
    isLastNameValid.value &&
    isEmailValid.value &&
    isPasswordValid.value
  ) {
    return true;
  } else {
    return false;
  }
};

const onSubmit = async () => {
  isShowToaster.value = false;

  const firstName = nameValue.value;
  const lastName = lastNameValue.value;
  const email = emailValue.value;
  const password = passwordValue.value;

  try {
    await signUp(firstName, lastName, email, password);
    router.push("/logged-in"); 
  } catch (error) {
    console.error("Sign up failed:", error);

    toasterType.value = "error";
    toasterMessage.value =
      error.response?.data?.detail || "Sign up failed. Please try again.";
    isShowToaster.value = true;
  }
};

</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />
  <header-main label="Sign In" hrefUrl="/sign-in" />

  <form v-on:submit.prevent="onSubmit" class="signUpForm" autocomplete="off">
    <h1 class="title-tell-us">Tell Us About Yourself</h1>

    <base-wizzard></base-wizzard>

    <div class="firstlastName">
      <BaseInput
        class="input-short"
        type="text"
        label="Given Name"
        name="Given Name"
        v-on:update:is-valid="onChildValidation"
        required
      />

      <BaseInput
        class="input-short"
        type="text"
        label="Last Name"
        name="Last Name"
        v-on:update:is-valid="onChildValidation"
        required
      />
    </div>

    <BaseInput
      class="input-long"
      type="email"
      label="Email"
      name="Email"
      v-on:update:is-valid="onChildValidation"
      required
    />

    <BaseInput
      class="input-long"
      :type="passwordShow ? 'text' : 'password'"
      label="Password"
      name="Sign Up Password"
      v-on:update:is-valid="onChildValidation"
      required
    />

    <base-button
      label="Next"
      :class="{ primaryBtn: isFormValid }"
      type="submit"
    />
  </form>
</template>

<style scoped lang="scss">
.signUpForm {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  height: 70vh;
}

.title-tell-us {
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 60px;
}

.firstlastName {
  display: flex;
  width: 420px;
  justify-content: space-around;
}
</style>
