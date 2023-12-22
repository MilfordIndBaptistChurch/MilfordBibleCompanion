<script setup lang="ts">
	defineProps<{
    highlight: string,
    methods: object
	}>()
</script>

<template>
  <p class="subtitle is-3" style="margin: 25px 0 0 0">+ {{highlight}}</p>
  <div style="margin: 25px 0 0 0">
    <ul>
      <li class="subtitle is-4" v-for="(value, prop) in methods"><b style="text-transform: capitalize;">[{{prop}}]</b> {{value}}</li>
    </ul>
  </div>
</template>