<script setup lang="ts">
import { useUserData } from "@/helpers/user";
import { ref } from "vue";
import router from "@/router";
import axios from "axios";
import HeaderMain from "@/components/HeaderMain.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseToaster from "@/components/BaseToaster.vue";

const user = useUserData();
user.count++;

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();
const isFormValid = ref(false);
const isEmailValid = ref(false);
const emailValue = ref();
const isPasswordValid = ref(false);
const passwordValue = ref();
const passwordShow = ref(false);

const onChildValidation = (isValueValid, label, inputValue, IsPasswordShow) => {
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
  if (isEmailValid.value === true && isPasswordValid.value === true) {
    return true;
  } else {
    return false;
  }
};

const onSubmit = () => {
  isShowToaster.value = false;
  toasterType.value = "";
  toasterMessage.value = "";

  if (isFormValid.value) {
    axios
    .post("/api/login", {
      email: emailValue.value,
      password: passwordValue.value,
    })

    .then(function (response) {
      switch (response.data) {
        case "User with that email doesn't exist":
          toasterType.value = "warning";
          toasterMessage.value = "User with that email doesn't exist";
          isShowToaster.value = true;
          break;

        case "Incorrect password":
          toasterType.value = "error";
          toasterMessage.value = "Incorrect password";
          isShowToaster.value = true;
          break;
      }

      if (typeof response.data !== "string") {
        let token = response.data.jwt;
        localStorage.setItem("user", token);

        user.isLogIn = true;
        user.getToken;
        router.push("/logged-in");
      }
    });
  }
};
</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />

  <header-main label="Sign Up" hrefUrl="/sign-up" />
  <form v-on:submit.prevent="onSubmit" class="signInForm" autocomplete="off">
    <h1 class="title-tell-us">Sign In</h1>

    <base-input
      class="input-long"
      type="email"
      label="Email"
      name="Email"
      v-on:update:is-valid="onChildValidation"
      required
    />

    <base-input
      class="input-long"
      type="password"
      label="Password"
      name="Login Password"
      v-on:update:is-valid="onChildValidation"
      required
    />

    <base-button
      label="Sign In"
      :class="{ primaryBtn: isFormValid }"
      type="submit"
    />
  </form>
</template>

<style lang="scss">
.signInForm {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  height: 70vh;
}
</style>
