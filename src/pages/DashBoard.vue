<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";
import { dateFormatation } from "@/helpers/dateFormat";
import { ref, onMounted, computed } from "vue";
import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import cvThumbnail from "@/components/cvThumbnail.vue";
import CvInput from "@/components/inputs/CvInput.vue";
import CvJobItem from "@/components/CvJobItem.vue";

const { mainCV, user, jobs } = storeToRefs(
  useUserData()
);
const { fillToken, fillConfig, fillMainCvId, fillMainCv, fillUserSocial, updateUser } = useUserData();

const userStore = useUserData();

const userSocials = computed(() => {
  return userStore.getUserSocial;
});

onMounted(() => {
  console.log('user onMounted', userSocials.value);
})

fillToken();
fillConfig();
fillMainCvId();
fillMainCv();
fillUserSocial();

const isShowToaster = ref(false);
const toasterType = ref();
const toasterMessage = ref();

const cvImages = ref({'1':true, '2':false, '3':false, '4':false, '5':false, '6':false, '7':false, '8':false, '9':false, '10':false, '11':false, '12':false, '13':false});
const selectedCv = ref(1);

const handleClickThumbnail = ( index ) => {
  cvImages.value[selectedCv.value] =  false;
  selectedCv.value = index;
  cvImages.value[selectedCv.value] = true;
}

</script>

<template>
  <base-toaster
    v-if="isShowToaster"
    :type="toasterType"
    :message="toasterMessage"
  />

  <header-main label="Log Out" hrefUrl="/logout" />

  <div class="dashboard">
    <div class="allTemplatesContainer">
      <div class="cvThumbnailsContainer">
        <cvThumbnail 
          v-for="(image, index) in cvImages" 
          :selected="cvImages[index]"
          :imageUrl="index"
          :index="index"
          @click="handleClickThumbnail(index)"
        />
      </div>
    </div>

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
            {{ user.firstName[0] }}{{ user.lastName[0] }}
          </p>
        </div>
        <div class="bio">
          <h1 class="firstLastName">
            {{ user.firstName }} {{ user.lastName }}
          </h1>
          <p class="jobTitle"> {{ mainCV.jobTitle }}</p>
          
          <CvInput 
            :placeholder="'Add Your Phone'" 
            :label="'+ Add Phone'" 
            :type="'tel'"
            :param="0"
            :previous-value="userSocials[0].link"
          />

          <p class="contact">{{ user.email }}</p>

          <CvInput 
            :placeholder="'Add Location'" 
            :label="'+ Location'" 
            :type="'text'"
            :param="1"
            :previous-value="userSocials[1].link"
          />

          <CvInput 
            :placeholder="'Add Linkedin'" 
            :label="'+ Linkedin'" 
            :type="'url'"
            :param="2"
            :previous-value="userSocials[2].link"
          />

          <CvInput 
            :placeholder="'Add Github'" 
            :label="'+ Github'" 
            :type="'url'"
            :param="3"
            :previous-value="userSocials[3].link"
          />

          <CvInput 
            :placeholder="'Add Other info'" 
            :label="'+ Other'" 
            :type="'text'"
            :param="4"
            :previous-value="userSocials[4].link"
          />

        </div>
          <div class="skillsContainer">
            <p class="jobTitle">Skills</p>
            <div class="skillsTagsContainer">
              <p class="skill" v-for="skill in mainCV.skills"> {{ skill }},&nbsp;</p>
            </div>
            <p class="jobTitle">languages</p>
            <div class="skillsTagsContainer"> 
              <p class="skill"> English - Fluent, Ukranian - Native, Russian - Native </p>
         </div>

        </div>
      </div>

      <div class="cvContent">
        <h2 class="cvContentTitle">Experience Summary</h2>
        <!-- <p class="addContact">+ Add Objective</p> -->
        <p class="summary"> Experienced product designer skilled in wireframing, prototyping, and creating design systems.
            Strong background in conducting user research, usability testing, and analyzing user behavior to improve product features.
            Proficient in various design tools, including Sketch, Figma, Zeplin, and Vue.js.
            Collaborative team player who can work with different teams, including developers, QA, marketing, and sales.
            Designed mobile apps for clients like NASCAR, Indycar, and ECHL hockey league, and created UX/UI solutions from scratch to optimize user experience.
            Knowledgeable in AWS cloud services, databases, and Python data structures.
            Completed Vue - The Complete Guide and Agile Planning for Software Products Course.
        </p>

      <!-- </div>
        <div v-for="job in jobs" class="cvContent">
          <h2 class="cvContentTitle">Work Experience</h2>
          
          <div class="jobPositionContainer">
            <p class="employerTitle">{{ job.employer }}</p>
            <p class="workPeriod">{{ dateFormatation([job.startDate, job.endDate ]) }}</p>
          </div>
          
          <p class="jobTitle">{{ job.position }}</p>

          <p class="summary">{{ job.description }}</p>
        </div>
      </div> -->

      <div class="cvContent">
        <h2 class="cvContentTitle">Work Experience</h2>

        <CvJobItem 
          v-for="job in jobs"
          :job-employer="job.employer"
          :work-period="dateFormatation([job.startDate, job.endDate ])"
          :job-position="job.position"
          :job-description="job.description"
        />
      </div>
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
  background: $white;
  margin-right: 34px;
  padding-top: 18px;
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
  padding-right: 40px;
}

.bio {
  width: 170px;
}
.firstLastName {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: $black;
  margin-bottom: 2px;
  margin-top: 8px;
}

.contact {
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  margin-top: 10px;
  padding-left: 2px;
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
  position: relative;
  bottom: 205px;
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

.skillsContainer {
  display: flex;
  flex-flow: column;
  padding-top: 10px;
  margin-left: 10px;
  justify-content: center;
  height: 205px;
  width: 270px;
}
.skillsTagsContainer{
  display: flex;
  flex-flow: wrap;
  align-content: flex-start;
  font-size: 12px;
  width: 304px;
}

.skill{
  height: 22px;
  margin: 0;
}

.cvThumbnailsContainer {
 display: flex;
 flex-wrap: wrap;
 margin-left: 21px;
}

</style>
