<template>
    <button :class="{ secondaryButton: true, disabledBtn: !disabled}">
        
      <div v-show="props.icon === 'plus'" :class="{ disabledBtn: !disabled }" class="btn-container">
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path :class="{ plusIcon: disabled }" fill-rule="evenodd" clip-rule="evenodd" d="M25.524 13.8785C25.524 20.236 20.3702 25.3897 14.0127 25.3897C7.65524 25.3897 2.50146 20.236 2.50146 13.8785C2.50146 7.52096 7.65524 2.36719 14.0127 2.36719C20.3702 2.36719 25.524 7.52096 25.524 13.8785ZM26.524 13.8785C26.524 20.7883 20.9225 26.3897 14.0127 26.3897C7.10296 26.3897 1.50146 20.7883 1.50146 13.8785C1.50146 6.96868 7.10296 1.36719 14.0127 1.36719C20.9225 1.36719 26.524 6.96868 26.524 13.8785ZM15.2481 12.9756C15.0731 12.9756 14.9312 12.8337 14.9312 12.6587V9.05813C14.9312 8.8831 14.7893 8.74121 14.6143 8.74121H13.4007C13.2257 8.74121 13.0838 8.8831 13.0838 9.05813V12.6587C13.0838 12.8337 12.9419 12.9756 12.7669 12.9756H9.25979C9.08476 12.9756 8.94287 13.1175 8.94287 13.2925V14.506C8.94287 14.681 9.08476 14.8229 9.25979 14.8229H12.7669C12.9419 14.8229 13.0838 14.9648 13.0838 15.1398V18.6989C13.0838 18.8739 13.2257 19.0158 13.4007 19.0158H14.6143C14.7893 19.0158 14.9312 18.8739 14.9312 18.6989V15.1398C14.9312 14.9648 15.0731 14.8229 15.2481 14.8229H18.7656C18.9406 14.8229 19.0825 14.681 19.0825 14.506V13.2925C19.0825 13.1175 18.9406 12.9756 18.7656 12.9756H15.2481Z" fill="#C4C4C4"/>
        </svg>

        <p :class="{ plusIcon: disabled, greyColor: !disabled }" class="buttonLabel"> {{ label }} </p>
      </div>
      
      <div v-show="props.icon === 'close'" class="btn-container">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.51517 3.72318C3.70002 3.53838 3.95069 3.43457 4.21207 3.43457C4.47345 3.43457 4.72412 3.53838 4.90897 3.72318L8.39447 7.20867L11.88 3.72318C12.0659 3.54362 12.3149 3.44426 12.5733 3.44651C12.8318 3.44876 13.079 3.55242 13.2618 3.73518C13.4445 3.91794 13.5482 4.16517 13.5504 4.42363C13.5527 4.68208 13.4533 4.93107 13.2738 5.11698L9.78828 8.60248L13.2738 12.088C13.4533 12.2739 13.5527 12.5229 13.5504 12.7813C13.5482 13.0398 13.4445 13.287 13.2618 13.4698C13.079 13.6525 12.8318 13.7562 12.5733 13.7584C12.3149 13.7607 12.0659 13.6613 11.88 13.4818L8.39447 9.99628L4.90897 13.4818C4.72306 13.6613 4.47407 13.7607 4.21562 13.7584C3.95717 13.7562 3.70993 13.6525 3.52717 13.4698C3.34441 13.287 3.24075 13.0398 3.2385 12.7813C3.23626 12.5229 3.33561 12.2739 3.51517 12.088L7.00067 8.60248L3.51517 5.11698C3.33037 4.93213 3.22656 4.68145 3.22656 4.42008C3.22656 4.1587 3.33037 3.90802 3.51517 3.72318Z" fill="#7A7A7A"/>
        </svg>

        <p :class="{ blackColor: props.icon === 'close' }" class="buttonLabel"> {{ label }} </p>
      </div>

    </button>

</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    label?: string;
    type: string;
    icon: string;
  }>(),
  {
    disabled: true,
    type: 'disabled',
    label: 'Button Name'
  }
)
</script>

<style scoped lang="scss">
  .secondaryButton{
    display: flex;
    width: 160px;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
  }

  .btn-container{
    display: flex;
    align-items: center;
  }

  .buttonLabel{
    padding-left: 10px;
  }
  .plusIcon{
    fill: $primary;
    color: $primary;
  }

  .blackColor{
    color: $black;
  }

  .greyColor{
    color: $grey;
  }

  .disabledBtn{
    pointer-events: none;
    cursor:default;
  }
</style>
