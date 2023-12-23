<script setup lang="ts">
  defineProps<{
    type: string
  }>()
</script>

<template>
  <div :class="{
    badge: type === 'typescript',
    'badge badge__vuejs': type === 'vuejs',
    'badge badge__github': type === 'github',
    'badge badge__kingjames': type === 'kingjames'
  }">
    <span class="badge-image-wrapper">
        <img v-if="type.includes('vuejs')" src="../assets/vuejs.svg" class="ml-1 mr-1 badge-image" />
        <img v-else-if="type.includes('typescript')" src="../assets/typescript.svg" class="ml-1 mr-1 badge-image" />
        <img v-else-if="type.includes('github')" src="../assets/github.png" class="ml-1 mr-1 badge-image" />
        <img v-else src="../assets/kingjames.png" class="ml-1 mr-1 badge-image" />
    </span>
    <span class="text-12 font-600 mr-1 badge-text">
        <a v-if="type.includes('vuejs')" href="https://vuejs.org" target="_blank">
          VueJS 3
        </a>
        <a v-else-if="type.includes('typescript')" href="https://www.typescriptlang.org" target="_blank">
          TypeScript
        </a>
        <a v-else-if="type.includes('github')" href="https://github.com/MilfordIndBaptistChurch/MilfordBibleCompanion" target="_blank">
          Github
        </a>
        <a v-else href="https://www.kingjamesbibleonline.org" target="_blank">
          King James
        </a>
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

  .badge__vuejs {
    margin: 0;
    background: #41b883;
    border: 1px solid #41b883;
  }

  .badge__github {
    background: #000000;
    border: 1px solid #000000;
  }

  .badge__kingjames {
    width: 120px;
    background: #a10004;
    border: 1px solid #a10004;
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
    font-size: 14px;
    margin-left: 5px;
  }

  .badge-text a {
    color: #fff;
  }

</style>