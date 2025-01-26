<script setup lang="ts">
import router from "@/router";
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";
import { ref, onMounted, watchEffect, toRaw, computed } from "vue";
import axios from 'axios';
import HeaderMain from "@/components/HeaderMain.vue";
import BaseToaster from "@/components/BaseToaster.vue";
import cvThumbnail from "@/components/cvThumbnail.vue";
import CvInput from "@/components/inputs/CvInput.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseJob from "@/components/BaseJob.vue";
import myUpload from 'vue-image-crop-upload';
import { addSocial } from "@/services/socials";

const userStore = useUserData();
const { mainCV, userSocial, user, profileImage, jobs } = storeToRefs(userStore);
const cvSummary = ref('');
const isShowGhost = ref(false);
const workHistory = ref([]);
const skills = ref([]);
const languages = ref([]);

const socials = ref();
const phone = userSocial.value[0].link
const linkedin = userSocial.value[2].link;

// const socialData = {
//   name: '+ Linkedin',
//   link: 'https://www.linkedin.com/in/ivanko22'
// };

// const submitSocial = async (socialData) => {
//   try {
//     const response = await addSocial(socialData);

//     console.log('response from submitSocial:', response);

//     userStore.fillUserSocial();

//   } catch (error) {
//     console.error('Error in submitSocial:', error);
//   }
// };

onMounted(async () => {
  await userStore.fillJobs(); // Explicitly call the method
  await userStore.fillCv();
  await userStore.fillUserSocial();

  socials.value = [...userStore.userSocial];

  // skills.value = [...skills.value, mainCV.value[0].skills];

  // skills.value = mainCV.value[0].skills.flat();

  // console.log('socials from unmounted', socials.value.length);
  // console.log('userSocials!!!!!!!!', socials.value[2].link);

  for (let index = 0; index < mainCV.value[0].skills.length; index++) {
    const skill = mainCV.value[0].skills[index];
    skills.value.push(skill);
  }

  console.log('skills', skills.value);

  languages.value.push(mainCV.value[0].languages[0]);

});

const userSocials = computed(() => {
  return userStore.getUserSocial;
});

console.log('userSocial 111111111111', userSocials);
console.log('skills 1', skills);

const avaData = ref(
  {
    show: false,
    en: {
      hint: 'Click or drag the file here to upload',
      loading: 'Uploading…',
      noSupported: 'Browser is not supported, please use IE10+ or other browsers',
      success: 'Upload success',
      fail: 'Upload failed',
      preview: 'Preview',
      btn: {
        off: 'Cancel',
        close: 'Close',
        back: 'Back',
        save: 'Save'
      },
      error: {
        onlyImg: 'Image only',
        outOfSize: 'Image exceeds size limit: ',
        lowestPx: 'Image\'s size is too low. Expected at least: '
      }
    },
    params: {
      token: '12321',
      name: 'avatar'
    },
    headers: {
      smail: '*_~'
    },
    imgDataUrl: profileImage,
    langType: {
      type: String,
      'default': 'en'
    },
    langExt: {
      type: Object,
      'default': ()=>null
    }
  }
)

const requestToOpenAi = ref([{
      model: "text-davinci-003",
      prompt: `'Please generate Experience Summary for CV. Use first person, but leave out the pronoun “I.”: 
      ${ mainCV.value.experience } years of expirience as a ${ mainCV.value.jobTitle } with job category ${ mainCV.value.jobCategory } 
      | Frontend Developer with this skills: ${ mainCV.value.skills }. Worked in several startups, up to A level invistments. Worked 
      ${ workHistory.value }, and others.`,
      max_tokens: 256,
      temperature: 0.5,
      n: 1,
      stop: null
    }
]);

const generateText = async () => {  
  isShowGhost.value = true;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: requestToOpenAi.value[0].model,
      prompt: requestToOpenAi.value[0].prompt,
      max_tokens: requestToOpenAi.value[0].max_tokens,
      n: requestToOpenAi.value[0].n,
      temperature: requestToOpenAi.value[0].temperature,
      stop: requestToOpenAi.value[0].stop
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      }
    });

    cvSummary.value = response.data.choices[0].text;
  
  } catch (error) {
        console.error(error);
      } finally {
        isShowGhost.value = false;
    }
};

// generateText();

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

const avaToggleShow = () => {
  avaData.value.show = true;
}

const cropSuccess = (imgDataUrl, field) => {
  avaData.value.imgDataUrl = imgDataUrl;
  asyncFnAva(imgDataUrl);
}

const asyncFnAva = async (imgDataUrl) => {
    const formAvaData = new FormData();
    const blob = await (await fetch(imgDataUrl)).blob();
    formAvaData.append('image', blob);

    addAva(formAvaData);
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
        <div class="uploadImage" @click="avaToggleShow">

          <my-upload 
            field="img"
            @crop-success="cropSuccess"
            v-model="avaData.show"
            :width="200"
            :height="200"
            :langExt="avaData.en"
            img-format="png">
          </my-upload>  

          <img class="ava" :src="avaData.imgDataUrl" style="margin-top = 30px;" width="200" height="200">

          <div v-if="!avaData.imgDataUrl">
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
              <!-- {{ user.firstName[0] }}{{ user.lastName[0] }} -->
            </p>
          </div>
        </div>

        <div class="bio">
          <h1 class="firstLastName">
            {{ user.firstName }} {{ user.lastName }}
          </h1>

          <div class="jobTitleContainer">
            <p @click="router.push('/step-three')" class="skillsTitle"> {{ mainCV.jobTitle }}</p>
            <img class="editIcon" src="@/assets/svg/edit.svg" alt="edit">
          </div>
         
          <CvInput 
            :placeholder="'Add Your Phone'" 
            :label="'+ Add Phone'" 
            :type="'tel'"
            :param="0"
            :previous-value="phone"
          />

          <!-- <CvInput 
            :placeholder="'Add Your Phone'" 
            :label="'+ Add Phone'" 
            :type="'tel'"
            :param="0"
            :previous-value="user.phone"
          /> -->

          <!-- <p class="contact">{{ user.email }}</p> -->

          <!-- <CvInput 
            :placeholder="'Add Location'" 
            :label="'+ Location'" 
            :type="'text'"
            :param="1"
            :previous-value="userSocials[1].link"
          /> -->

          <!-- <CvInput
            :placeholder="'Add Linkedin'"
            :label="'+ Linkedin'"
            :type="'url'"
            :param="2"
            :previous-value="socials?.value[2]?.link || ''"
          /> -->

          <!-- <CvInput 
            :placeholder="'Add Github'" 
            :label="'+ Github'" 
            :type="'url'"
            :param="3"
            :previous-value="userSocials[3].link"
          /> -->
<!-- 
          <CvInput 
            :placeholder="'Add Other info'" 
            :label="'+ Other'" 
            :type="'text'"
            :param="4"
            :previous-value="userSocials[4].link"
          /> -->

        </div>
          <div class="skillsContainer">
            <p class="skillsTitle">Skills</p>

            <div @click="router.push('/step-three')" class="skillsTagsContainer">
              <p class="skill" v-for="(skill, index) in skills" :key="index"> {{ skill }}, &nbsp;</p>
              <img class="editIcon" src="@/assets/svg/edit.svg" alt="edit">
            </div>

            <p class="skillsTitle">languages</p>
            
            <div @click="router.push('/step-three')" class="skillsTagsContainer"> 
              <p class="skill" v-for="(language, index) in languages" :key="index">
                {{ language.language }} - {{ language.level }}
              </p>

              <img class="editIcon" src="@/assets/svg/edit.svg" alt="edit">
            </div>

        </div>
      </div>

      <div class="cvContent">
        <h1 class="loading" v-if="isShowGhost"> Loading... </h1>

        <BaseJob 
          v-if="!isShowGhost"
          @generate-text="generateText"
          :type="'summary'"
          :jobDescription="cvSummary"
        />

      <div class="cvContent">
        <h2 class="cvContentTitle">Work Experience</h2>
        <BaseForm :isJobEdit="true" />
      </div>
    </div>

  </div>
</div>

</template>

<style scoped lang="scss">
  .ava{
    cursor: pointer;
  }
  .dashboardTitle {
    text-align: center;
  }
  .dashboard {
    display: flex;
    justify-content: center;
  }

  .allTemplatesContainer {
    width: 330px;
    background: var(--white);
    margin-right: 34px;
    padding-top: 18px;
  }

  .cvContainer {
    width: 800px;
    height: 1114px;
    background: var(--white);
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
    color: var(--black);
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
    color: var(--grey);
    margin: 0;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover {
      color: var(--primary);
      font-weight: 500;
    }
  }

  .initials {
    position: relative;
    bottom: 205px;
    width: 206px;
    font-weight: 600;
    font-size: 61px;
    color: var(--grey);
    text-align: center;
  }

  .cvContentTitle {
    font-weight: 700;
    font-size: 18px;
    color: var(--black);
    margin-top: 16px;
    margin-bottom: 8px;
    padding-left: 10px;
    padding-right: 10px;
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
    cursor: pointer;
    flex-flow: wrap;
    align-content: flex-start;
    font-size: 12px;
    width: 304px;

    &:hover .editIcon {
      display: inline;
    }
  }

  .skill{
    height: 22px;
    margin: 0;
  }

  .jobTitleContainer{
    display: flex;
    cursor: pointer;
    flex-flow: wrap;
    align-items: flex-end;

    &:hover .editIcon{
      display: inline;
    }
  }

  .cvThumbnailsContainer {
  display: flex;
  flex-wrap: wrap;
  margin-left: 21px;
  }

  .skillsTitle {
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 14px;
  }

  .editIcon {
    display: none;
    margin-bottom: 4px;
    margin-left: 6px;
  }

  .loading {
    padding: 10px;
  }

</style>
