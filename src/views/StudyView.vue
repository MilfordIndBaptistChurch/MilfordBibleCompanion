<script setup lang="ts">
	import Selector from '../components/Selector.vue';
	import Study from '../components/Study.vue';
  import Test from '../components/Test.vue';
  import dataSource from '../data/highlights.json';
</script>

<template>
  <main>
  	<Selector v-on:set-ref-data="updateTopLevelRef" />
    <div v-for="items in dataSource">
        <div v-for="item in items[selectedRef as keyof typeof items]">
          <div v-if="Array.isArray(item)" v-for="(studyRef, i) in item">
            <Study v-bind:index="i" v-bind:highlight="studyRef.highlight" v-bind:methods="studyRef.methods" />
          </div>
          <Test msg="hello world" name="Hello world" />
        </div>
  	</div>
    <!--
    <div style="height: 25px;"></div>
    <div style="padding:0 50px 0 0">
      <div class="tabs">
        <ul>
          <li class="is-active"><a>Images</a></li>
          <li><a>Audio</a></li>
          <li><a>Videos</a></li>
          <li><a>Documents</a></li>
        </ul>
      </div>
      <div class="columns is-multiline">
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
              <div class="card-image">
                  <figure class="image is-3by2">
                    <img src="https://unsplash.it/300/200/?random&pic=1" alt="">
                  </figure>
                  <div class="card-content is-overlay is-clipped">
                    <span class="tag">
                      Image Title
                    </span>       
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">
                    Image of....
                  </a>
              </footer>
          </div>
        </div>
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
              <div class="card-image">
                  <figure class="image is-3by2">
                    <img src="https://unsplash.it/300/200/?random&pic=2" alt="">
                  </figure>
                  <div class="card-content is-overlay is-clipped">
                    <span class="tag">
                      Image Title
                    </span>       
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">
                    Image of....
                  </a>
              </footer>
          </div>
        </div>  
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
              <div class="card-image">
                  <figure class="image is-3by2">
                    <img src="https://unsplash.it/300/200/?random&pic=3" alt="">
                  </figure>
                  <div class="card-content is-overlay is-clipped">
                    <span class="tag">
                      Image Title
                    </span>       
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">
                    Image of....
                  </a>
              </footer>
          </div>
        </div>
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
              <div class="card-image">
                  <figure class="image is-3by2">
                    <img src="https://unsplash.it/300/200/?random&pic=4" alt="">
                  </figure>
                  <div class="card-content is-overlay is-clipped">
                    <span class="tag">
                      Image Title
                    </span>       
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">
                    Image of....
                  </a>
              </footer>
          </div>
        </div>
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
              <div class="card-image">
                  <figure class="image is-3by2">
                    <img src="https://unsplash.it/300/200/?random&pic=5" alt="">
                  </figure>
                  <div class="card-content is-overlay is-clipped">
                    <span class="tag">
                      Image Title
                    </span>       
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">
                    Image of....
                  </a>
              </footer>
          </div>
        </div>
        <div class="column is-one-quarter-desktop is-half-tablet">
          <div class="card">
              <div class="card-image">
                  <figure class="image is-3by2">
                    <img src="https://unsplash.it/300/200/?random&pic=6" alt="">
                  </figure>
                  <div class="card-content is-overlay is-clipped">
                    <span class="tag">
                      Image Title
                    </span>       
                  </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item">
                    Image of....
                  </a>
              </footer>
          </div>
        </div>
      </div>
    </div>
    -->
  </main>
</template>

<style lang="scss">
  @import "../assets/main.scss";
</style>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  const selectedRef = ref(Object.keys(dataSource[0])[0] === 'Genesis 1:1' ? Object.keys(dataSource[0])[0] : '');

	export default defineComponent({
    methods: {
      updateTopLevelRef (ref: string) {
        selectedRef.value = ref;
      }
    }
	});
</script>
