<script setup lang="ts">
  defineProps<{
    type: string
  }>()
</script>

<template>
  <div :class="{ badge: type === 'typescript', 'badge badge__alternate': type === 'vuejs' }">
    <span class="badge-image-wrapper">
        <img v-if="type.includes('typescript')" src="../assets/typescript.svg" class="ml-1 mr-1 badge-image" />
        <img v-else src="../assets/vuejs.svg" class="ml-1 mr-1 badge-image" />
    </span>
    <span class="text-12 font-600 mr-1 badge-text">
        <span v-if="type.includes('typescript')">TypeScript</span>
        <span v-else>VueJS 3</span>
    </span>
  </div>
</template>

<style scoped>

  .badge {
    display: inline-flex;
    align-items: center;
    width: 110px;
    margin: 0 0 0 12px;
    background: #007acc;
    border-radius: 4px;
    border: 1px solid #007acc;
  }

  .badge__alternate {
    margin: 0;
    background: #41b883;
    border: 1px solid #41b883;
  }

  .badge-image-wrapper {
    display: flex;
    align-items: center;
    padding:3px;
    background: #fff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .badge-image {
    max-width:100%;
    width:16px;
    height:16px;
  }

  .badge-text {
    color: #fff;
    margin-left: 5px;
  }

</style>