<script setup lang="ts">
  import { useUserData } from "@/helpers/user";
  import { ref } from "vue";
  import router from "@/router";
  import { login } from "@/services/auth";

  import HeaderMain from "@/components/HeaderMain.vue";
  import BaseInput from "@/components/inputs/BaseInput.vue";
  import BaseButton from "@/components/BaseButton.vue";
  import BaseToaster from "@/components/BaseToaster.vue";

  const user = useUserData();
  user.count++;

  const isShowToaster = ref(false);
  const toasterType = ref("");
  const toasterMessage = ref("");
  const isFormValid = ref(false);
  const emailValue = ref("");
  const passwordValue = ref("");
  const passwordShow = ref(false);
  const isEmailValid = ref(false);
  const isPasswordValid = ref(false);

  const onChildValidation = (isValueValid, label, inputValue, isPasswordVisible) => {
    if (label === "Email") {
      isEmailValid.value = isValueValid;
      emailValue.value = inputValue;
    } else if (label === "Password") {
      isPasswordValid.value = isValueValid;
      passwordValue.value = inputValue;
      passwordShow.value = isPasswordVisible;
    }

    isFormValid.value = isEmailValid.value && isPasswordValid.value;
  };

  const onSubmit = async () => {
    isShowToaster.value = false;
    toasterType.value = "";
    toasterMessage.value = "";

    if (isFormValid.value) {
      try {
        await login(emailValue.value, passwordValue.value);
        user.isLogIn = true;
        router.push("/logged-in"); 

      } catch (error) {
        console.error("Login failed:", error);

        toasterType.value = "error";
        toasterMessage.value = error.response?.data?.detail || "Login failed. Please try again.";
        isShowToaster.value = true;
      }
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
