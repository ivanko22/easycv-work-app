<script setup lang="ts">
import { ref } from "vue";
import Chip from "@/components/chips/BaseChip.vue";

const inputValue = ref("");
const isInputActive = ref(false);
const allSkills = ref([
  "HTML5",
  "Node.js",
  "Python",
  "React",
  "ERP",
  "PHP",
  "CRM",
  "Intégration",
  "JEE",
  "AngularJS",
  "pilotage",
  "Angular",
  "Linux",
  "Spring Boot",
  "Web",
  "production",
  "Front-end Development",
  "Redis",
  "Design",
  "MySQL",
  "C++",
  "Ruby on Rails",
  "Tests",
  "développeur",
  "Amazon Web Services",
]);

const selectedSkills = ref([]);
const errorMessage = ref('Required');

const handleInputStatus = (status) => {
  isInputActive.value = status;
};

const addTypingChip = (skill) => {
  selectedSkills.value.push(skill);
  inputValue.value = "";
  updateSkills(selectedSkills.value);
};

const addClickSkillChip = (skill, index) => {
  selectedSkills.value.push(skill);
  allSkills.value.splice(index, 1)
  updateSkills(selectedSkills.value);
};

const removeChip = (index) => {
  selectedSkills.value.splice(index, 1);
  updateSkills(selectedSkills.value);
};

const emit = defineEmits<{
  (e: 'update:skills', value: string): void;
}>()

const updateSkills = (skills) => {
    emit('update:skills', skills)
}

</script>

<template>
  <p class="skillsLabel">Skills</p>

  <div class="chipsContainer" :class="{ chipsContainerActive: isInputActive }">


    <Chip
      v-for="(chip, index) in selectedSkills"
      type="selected"
      :label="chip"
      :key="index"
      @click="removeChip(index)"
    />

    <input
      type="text"
      v-model="inputValue"
      @focus="handleInputStatus(true)"
      @blur="handleInputStatus(false)"
      v-on:keydown.enter.prevent="addTypingChip(inputValue)"
      @keydown.delete="removeChip(selectedSkills.length - 1)"
    />
  </div>
  <p v-if="selectedSkills.length === 0" class="errorMessage"> {{ errorMessage }} </p>

  <div class="skillsChipsContainer">
    <Chip
      v-for="(chip, index) in allSkills"
      type="not selected"
      :label="chip"
      :key="index"
      @click="addClickSkillChip(chip, index)"
    />
  </div>
</template>

<style scoped lang="scss">
.chipsContainer {
  display: flex;
  width: 398px;
  min-height: 50px;
  flex-wrap: wrap;
  align-content: space-between;
  background: $white;
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  outline: none;
  border: none;
  border: 1px solid $ultraLightGrey;
  padding-left: 10px;

  input {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    border: none;
    outline: none;
    margin-top: 4px;
    align-items: center;
    font-size: 14px;
    height: 31px;
    width: 31px;
    margin-left: 4px;
    margin-right: 4px;
  }

  &:hover {
    border: 1px solid $middleGrey;
  }
}

.chipsContainerActive {
  border: 1.5px solid $primary !important;
}

.skillsLabel {
  position: relative;
  left: 16px;
  bottom: 2px;
  font-size: 14px;
  color: $grey;
  pointer-events: none;
}

.skillsChipsContainer {
  display: flex;
  width: 398px;
  min-height: 50px;
  flex-wrap: wrap;
  align-content: space-between;
  outline: none;
  padding-left: 10px;
  margin-top: 8px;
}
.errorMessage{
    font-weight: 400;
    font-size: 12px;
    text-align: right;
    color: $error;
}
</style>
