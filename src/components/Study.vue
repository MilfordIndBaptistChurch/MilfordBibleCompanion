<script setup lang="ts">
	defineProps<{
    index: number,
    highlight: string,
    methods: object
	}>()
</script>

<template>
  <p v-if="highlight" class="subtitle is-3 collapse" @click="toggle">
    <span v-if="isCollapsed" class="collapse__button">+</span>
    <span v-if="!isCollapsed" class="collapse__button">-</span>
    &nbsp;
    {{highlight}}
  </p>
  <div v-collapse="isCollapsed" style="margin: 25px 0 0 0">
    <ul>
      <li class="subtitle is-4" v-for="(value, prop) in methods"><b style="text-transform: capitalize;">[{{prop}}]</b> {{value}}</li>
    </ul>
  </div>
</template>

<script lang="ts">

  export default {
    props: ['index', 'methods', 'highlight'],
    data() {
      return {
        isCollapsed: this.index === 0 ? false : true
      }
    },
    methods: {
      toggle () {
        this.isCollapsed = !this.isCollapsed
      }
    }
  }
</script>
