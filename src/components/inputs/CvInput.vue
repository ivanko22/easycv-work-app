<script setup lang="ts">
import { defineProps, withDefaults, ref, nextTick} from 'vue';
import { storeToRefs } from "pinia";
import { useUserData } from "@/helpers/user";

const { token, mainCVid, mainCV, userInfo, jobs } = storeToRefs(
  useUserData()
);
const { fillToken, fillConfig, fillMainCvId, fillMainCv, updateUser } = useUserData();

fillToken();
fillConfig();
fillMainCvId();
fillMainCv();

const props = withDefaults(
  defineProps<{
      label?: string,
      type?: string,
      placeholder: string, 
      previousValue: string
    }>(),
  {
    label: '',
    type: 'text'
  }
);

const myInput = ref(null);
const isPhone = ref(false);
const isShowLabel = ref(true);
const isShowInput = ref(false);
const inputValue = ref('sdfsdf');
inputValue.value = props.previousValue;
// console.log('props.previousValue', props.previousValue, props.label);

const socials = ref({
    email: null,
    firstName: null,
    lastName: null,
    languages: [{
      language: null, 
      level: null
    }],
    socials: [],
    skills: null
  });

const fillSocials = () => {
    socials.value.socials = userInfo.value.socials;
    // console.log('socials.value', socials.value.socials[0].name);
}
fillSocials();

const handleInput = (arg) => {
    if (arg === 'click') {
        isShowLabel.value = false;
        isShowInput.value = true;

        nextTick(() => {
            myInput.value.focus();
         });
    }

    if (arg === 'blur' && inputValue.value.length < 1) {
        isShowInput.value = false;
        isShowLabel.value = true;
    }

    if (inputValue.value.length > 1) {
        isShowLabel.value = false;
    }

    if(props.type === 'tel'){
        isPhone.value = true;
    }
}

const onSubmit = (type) => {
  socials.value.socials.push({ name: type, link: inputValue.value})
  updateUser(socials.value);
}

</script>

<template>
    <div class="inputCv" @click="handleInput('click')">
        <label v-if="isShowLabel" class="label"> {{ label }} </label>
        <input 
            ref="myInput"
            v-if="isShowInput" 
            v-model="inputValue"
            :value='inputValue'
            :class="{ phone: isPhone }"
            :type=type 
            :placeholder=placeholder 
            @blur="handleInput('blur')"
            @input="handleInput('input')"
            @keyup.enter="onSubmit(label)"
            autofocus
        >
    </div>
</template>

<style scoped lang="scss">
    .inputCv {

    }

    .label {
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

    input[type=text], input[type=tel], input[type=url] {
        border: none;
        -webkit-appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font-size: 13px;
        outline: none;
        width: 150px;
    }

    input[type=text]:focus, input[type=tel]:focus, input[type=url]:focus {
        border: none;
        border-bottom: 1px solid $primary;
    }

    input[type=text]:active, input[type=tel]:active, input[type=url]:focus {
        border-bottom: 1px solid $primary;
    }

    input[type=text]::placeholder, input[type=tel]::placeholder div {
        font-size: 13px !important;
        font-weight: 300;
        color: $lightGrey;
    }

    .phone {
        font-weight: 600;
        font-size: 18px !important;
        margin-top: 12px;
    }
</style>