<script setup lang="ts">

import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    imageUrl: string;
    forbiden?: boolean;
  }>(),
  {
    forbiden: true,

  }
)

const getImageUrl = () => {
    return new URL(`../assets/img/cv/${props.imageUrl}.png`, import.meta.url).href
}

</script>

<template>
    <div class="cvThumbnailContainer">
        <img class="cvThumbnail" :src=getImageUrl()>
        <p class="cvThumbnailTitle">Template {{ props.imageUrl }}</p>
    </div>

</template>

<style scoped lang="scss">

.cvThumbnailContainer {
    display: flex;
    flex-flow: column;
    align-items: center;
}
.cvThumbnail {
  width: 124px;
  height: 124px;
  box-sizing: border-box;
  border: 2px solid $ultraLightGrey;
  margin: 10px;
}

.cvThumbnailTitle {
    font-weight: 500;
    font-size: 14px;
    color: $grey;
    margin-top: 2px;
}
</style>