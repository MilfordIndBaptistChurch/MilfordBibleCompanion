<script setup lang="ts">
	defineProps<{
	  booksCount: number,
	  crossRefCount: number,
	  charactersCount: number
	}>()
</script>

<template>
	<div class="side-nav">
		<aside class="menu" style="margin: 0 0 25px 0">
		  <p class="menu-label">
		    General
		  </p>
		  <ul class="menu-list">
		    <li><a>Books ({{booksCount}})</a></li>
		    <li><a>Cross ref ({{crossRefCount}})</a></li>
		  </ul>
		  <p class="menu-label">
		    Application
		  </p>
		  <ul class="menu-list">
		    <li><a>Sermons (0)</a></li>
		    <li><a>Illustrations (0)</a></li>
		    <li><a>Characters ({{charactersCount}})</a></li>
		    <li><a>Images (0)</a></li>
		  </ul>
		  <p class="menu-label">
		    Extra
		  </p>
		  <ul class="menu-list">
		    <li><a>Bible Studies (0)</a></li>
		    <li><a>Reading list (0)</a></li>
		    <li><a>Notes (0)</a></li>
		  </ul>
		</aside>
	</div>
</template>