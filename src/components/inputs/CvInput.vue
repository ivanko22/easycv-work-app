<script setup lang="ts">
import { defineProps, withDefaults, ref, nextTick, computed, onMounted} from 'vue';
import { useUserData } from "@/helpers/user";

const { fillToken, fillConfig, fillMainCvId, updateUser } = useUserData();

fillToken();
fillConfig();
fillMainCvId();
fillMainCv();

const props = withDefaults(
  defineProps<{
      label?: string,
      type?: string,
      placeholder: string, 
      previousValue: string,
      param: number
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
const inputValue = ref('');
inputValue.value = props.previousValue;

const inputWidth = ref(inputValue.value.length);

const cssVars = computed(() => {
    return {'width': ((inputWidth.value -   1) * 1) + 'ch'};
});

onMounted(() => {
    if (myInput.value) {
        myInput.value.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            onSubmit();
            myInput.value.blur();
        }
        });
    }
});

const handleInput = (arg) => {
    inputWidth.value = inputValue.value.length;

    if (arg === 'click') {
        isShowLabel.value = false;
        isShowInput.value = true;

        nextTick(() => {
            myInput.value.focus();
         });
    }

    if (arg === 'blur' && inputValue.value.length < 1) {

        nextTick(() => {
            myInput.value.unfocus();
         });

        isShowInput.value = false;
        isShowLabel.value = true;
    }

    if (inputValue.value.length > 1) {
        isShowLabel.value = false;
        isShowInput.value = true;
    }

    if(props.type === 'tel'){
        isPhone.value = true;
    }
}

handleInput(inputValue.value);

const onSubmit = () => {    
    updateUser(props.param, inputValue.value);
}

</script>

<template>
    <div 
        class="inputCv" 
        @click="handleInput('click')" 
    >
        <label v-if="isShowLabel" class="label"> {{ label }} </label>
        <input 
            ref="myInput"
            :style="cssVars"
            v-if="isShowInput" 
            v-model="inputValue"
            :value='inputValue'
            :class="{ phone: isPhone }"
            :type=type
            :param="param"
            :placeholder=placeholder 
            @blur="handleInput('blur')"
            @input="handleInput('input')"
            @keyup.enter="onSubmit()"
        >
        <svg class="editIcon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7813 2.86274C11.1404 2.50377 11.6274 2.30215 12.1351 2.30225C12.6429 2.30234 13.1298 2.50413 13.4888 2.86324C13.8478 3.22234 14.0494 3.70934 14.0493 4.21709C14.0492 4.72485 13.8474 5.21177 13.4883 5.57074L12.7553 6.30274L10.0463 3.59674L10.7803 2.86274H10.7813ZM9.34128 4.30374L3.38528 10.2577C3.2045 10.4387 3.06824 10.6591 2.98728 10.9017L2.07328 13.6447C2.04408 13.7328 2.03994 13.8272 2.06131 13.9174C2.08268 14.0076 2.12873 14.0901 2.1943 14.1557C2.25987 14.2213 2.34239 14.2673 2.43263 14.2887C2.52286 14.3101 2.61727 14.3059 2.70528 14.2767L5.44828 13.3627C5.69128 13.2827 5.91128 13.1457 6.09228 12.9647L12.0483 7.01074L9.34028 4.30374H9.34128Z" fill="#B3B3B3"/>
        </svg>

    </div>
</template>

<style scoped lang="scss">

    .inputCv {
        display: flex;
        margin-top: 3px;
        align-items: center;
        cursor: pointer;
        
        input {
            cursor: pointer;
        }

        &:hover .editIcon{
            display: block;
            color: var(--primary);

            path {
                fill: var(--primary);
            }
            
        }   
    }
    .editIcon{
        display: none;
    }

    .label {
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

    input[type=text], input[type=tel], input[type=url] {
        border: none;
        -webkit-appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font-size: 13px;
        outline: none;
        // width: 150px;
    }

    input[type=text]:focus, input[type=tel]:focus, input[type=url]:focus {
        border: none;
        border-bottom: 1px solid var(--primary);
    }

    input[type=text]:active, input[type=tel]:active, input[type=url]:focus {
        border-bottom: 1px solid var(--primary);
    }

    input[type=text]::placeholder, input[type=tel]::placeholder div {
        font-size: 13px !important;
        font-weight: 300;
        color: var(--lightGrey);
    }

    .phone {
        font-weight: 600;
        font-size: 18px !important;
    }
</style>