<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
	<div class="grid">
		<div>&nbsp;</div>
		<div class="middle">
	    <Header title="Milford Bible Companion" />
			<RouterView />
		</div>
		<div class="side-nav">
			<aside class="menu">
			  <p class="menu-label">
			    General
			  </p>
			  <ul class="menu-list">
			    <li><a>Books (5)</a></li>
			    <li><a>Cross ref (10)</a></li>
			    <li><a>Accordance (0)</a></li>
			  </ul>
			  <p class="menu-label">
			    Application
			  </p>
			  <ul class="menu-list">
			    <li><a>Sermons (0)</a></li>
			    <li><a>Illustrations (0)</a></li>
			    <li><a>Characters (4)</a></li>
			    <li><a>History (0)</a></li>
			  </ul>
			  <p class="menu-label">
			    Extra
			  </p>
			  <ul class="menu-list">
			    <li><a>Bible Studies (0)</a></li>
			    <li><a>Discussions (0)</a></li>
			    <li><a>Notes (0)</a></li>
			  </ul>
			</aside>
		</div>
	</div>
</template>