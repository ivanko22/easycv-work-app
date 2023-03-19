<script setup lang="ts">

import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    imageUrl: string;
    forbiden?: boolean;
    selected?: boolean;
  }>(),
  {
    forbiden: true,
    selected: false,
  }
)

const getImageUrl = () => {
    return new URL(`../assets/img/cv/${props.imageUrl}.png`, import.meta.url).href
}

</script>

<template>
    <div class="cvThumbnailContainer">
        <div v-if="props.selected" class="cvThumbnailSelectedContainer">
            <svg class="checkmarkIcon" width="51" height="44" viewBox="0 0 51 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.872 1.92923C47.3114 1.537 46.6791 1.25905 46.0111 1.11126C45.3431 0.963467 44.6525 0.948729 43.9788 1.06789C43.3051 1.18704 42.6614 1.43776 42.0846 1.80572C41.5078 2.17368 41.0092 2.65167 40.6172 3.21238L20.8118 31.4971L7.82596 22.6267C6.78444 21.9142 5.50258 21.6447 4.26235 21.8774C3.02212 22.1101 1.92513 22.826 1.2127 23.8675C0.50027 24.909 0.230757 26.1909 0.463452 27.4311C0.696148 28.6713 1.41199 29.7683 2.4535 30.4807L19.8603 42.3703C20.3965 42.7362 21.0023 42.9876 21.64 43.1087C22.2778 43.2298 22.9336 43.218 23.5665 43.074C24.2416 42.956 24.8868 42.7059 25.4651 42.338C26.0433 41.9702 26.5433 41.4918 26.9363 40.9304L49.1559 9.18802C49.9478 8.05456 50.2574 6.65307 50.0165 5.29153C49.7755 3.92998 49.0039 2.71978 47.8712 1.92685" fill="#4EAB4F"/>
            </svg>
            <div class="cvThumbnailSelected"></div>
        </div>

        <img class="cvThumbnail" :src=getImageUrl()>
        <p class="cvThumbnailTitle">Template {{ props.imageUrl }}</p>
    </div>

</template>

<style scoped lang="scss">

.cvThumbnailContainer {
    display: flex;
    flex-flow: column;
    align-items: center;
    cursor: pointer;
}
.cvThumbnail {
  width: 124px;
  height: 124px;
  box-sizing: border-box;
  border: 2px solid $ultraLightGrey;
  margin: 10px;

  &:hover{
    border: 3px  solid $primary;
  }
}

.cvThumbnailTitle {
    font-weight: 500;
    font-size: 14px;
    color: $grey;
    margin-top: 2px;
}
.cvThumbnailSelectedContainer {
    position: absolute;
    margin-top: 10px;
}
.cvThumbnailSelected {
    width: 118px;
    height: 118px;
    background: rgba(255, 255, 255, 0.7);
    border: 3px solid $ultraLightGrey;
}

.checkmarkIcon {
    position: absolute;
    top: 37px;
    right: 33px;
}
</style>