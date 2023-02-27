<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";
import { ref } from "vue";
import axios from "axios";
import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";

const { token, mainCVid, mainCV, userInfo, isLogIn, count } = storeToRefs(
  useUserData()
);
const { fillToken, fillConfig, fillMainCvId, fillMainCv } = useUserData();

fillToken();
fillConfig();
fillMainCvId();
fillMainCv();

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

console.log("dashboard", mainCV, userInfo.value);
</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />

  <header-main label="Log Out" hrefUrl="/logout" />

  <!-- <h1 class="dashboardTitle">Dashboard{{ cv[0].position }}</h1> -->

  <div class="dashboard">
    <div class="allTemplatesContainer"></div>
    <div class="cvContainer">
      <div class="cvHeaderContainer">
        <div class="uploadImage">
          <svg
            width="201"
            height="205"
            viewBox="0 0 201 205"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M9.99967 10.6667V15.6667H8.33301V32.3333H34.9997V12.3333H28.2497L25.1997 9H14.9997V10.6667H9.99967ZM21.6663 14C26.2663 14 29.9997 17.7333 29.9997 22.3333C29.9997 26.9333 26.2663 30.6667 21.6663 30.6667C17.0663 30.6667 13.333 26.9333 13.333 22.3333C13.333 17.7333 17.0663 14 21.6663 14Z"
              fill="#DADADA"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.7167 8.99935H35C36.4743 8.99935 37.7331 9.96939 38.1695 11.3027H200.245V204.303H7.24512V35.4825C5.94187 35.0289 5 33.7854 5 32.3327V15.666H8.33333V32.3327H35V12.3327H28.25L25.2 8.99935H15V5.66602H26.6667L29.7167 8.99935ZM10.2451 35.666V201.303H197.245V14.3027H38.3333V32.3327C38.3333 34.166 36.8333 35.666 35 35.666H10.2451ZM21.6667 30.666C17.0667 30.666 13.3333 26.9327 13.3333 22.3327C13.3333 17.7327 17.0667 13.9993 21.6667 13.9993C26.2667 13.9993 30 17.7327 30 22.3327C30 26.9327 26.2667 30.666 21.6667 30.666ZM26.6667 22.3327C26.6667 19.5827 24.4167 17.3327 21.6667 17.3327C18.9167 17.3327 16.6667 19.5827 16.6667 22.3327C16.6667 25.0827 18.9167 27.3327 21.6667 27.3327C24.4167 27.3327 26.6667 25.0827 26.6667 22.3327ZM8.33333 8.99935V13.9993H5V8.99935H0V5.66602H5V0.666016H8.33333V5.66602H13.3333V8.99935H8.33333Z"
              fill="#DADADA"
            />
          </svg>
          <p class="initials">
            {{ userInfo.firstName[0] }}{{ userInfo.lastName[0] }}
          </p>
        </div>
        <div class="bio">
          <h1 class="firstLastName">
            {{ userInfo.firstName }} {{ userInfo.lastName }}
          </h1>
          <p class="jobTitle">Product Designer need from DB {{}}</p>
          <p class="contact">{{ userInfo.email }}</p>
          <p class="addContact">+ Add Phone</p>
          <p class="addContact">+ Location</p>
          <p class="addContact">+ Linkedin</p>
          <p class="addContact">+ Github</p>
          <p class="addContact">+ Other</p>
        </div>
      </div>

      <div class="cvContent">
        <h2 class="cvContentTitle">Objective Overview</h2>
        <p class="addContact">+ Add Objective</p>
      </div>

      <div class="cvContent">
        <h2 class="cvContentTitle">Work Experience</h2>
        <p class="addContact">{{ mainCV[0] }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboardTitle {
  text-align: center;
}
.dashboard {
  display: flex;
  justify-content: center;
}

.allTemplatesContainer {
  width: 330px;
  height: 1114px;
  background: $white;
  margin-right: 34px;
}

.cvContainer {
  width: 800px;
  height: 1114px;
  background: $white;
  padding: 56px;
  padding-top: 46px;
}

.cvHeaderContainer {
  display: flex;
  flex-flow: wrap;
  height: 232px;
}

.uploadImage {
  width: 200px;
  padding-right: 70px;
}

.bio {
}

.firstLastName {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: $black;
  margin-bottom: 2px;
  margin-top: 8px;
}

.jobTitle {
  font-weight: 600;
  font-size: 16px;
  margin: 0;
}

.contact {
  font-weight: 400;
  font-size: 14px;
  margin: 0;
  margin-bottom: 8px;
  margin-top: 10px;
}

.addContact {
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: $grey;
  margin: 0;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    color: $primary;
    font-weight: 500;
  }
}

.initials {
  position: absolute;
  top: 139px;
  width: 206px;
  font-weight: 600;
  font-size: 61px;
  color: $grey;
  text-align: center;
}

.cvContentTitle {
  font-weight: 700;
  font-size: 18px;
  color: $black;
}
</style>
