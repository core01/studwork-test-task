<template>
  <div id="app">
    <header class="w-full px-6 bg-white">
      <div
        class="container mx-auto max-w-xl md:flex justify-between items-center"
      >
        <router-link
          to="/"
          class="block py-6 w-full text-center md:text-left md:w-auto text-grey-dark no-underline flex justify-center items-center"
        >
          Studwork.org test
        </router-link>
      </div>
    </header>
    <!-- nav -->
    <nav
      class="w-full bg-white md:pt-0 px-6 relative z-20 border-t border-b border-grey-light"
    >
      <div
        class="container mx-auto max-w-xl md:flex justify-between items-center text-sm md:text-md md:justify-start"
      >
        <div
          class="w-full md:w-1/2 text-center md:text-left py-4 flex flex-wrap justify-center items-stretch md:justify-start md:items-start"
        >
          <router-link
            to="/"
            class="px-2 md:pl-0 md:mr-3 md:pr-3 text-grey-darker no-underline md:border-r border-grey-light"
          >
            Home
          </router-link>
          <router-link
            class="px-2 md:pl-0 md:mr-3 md:pr-3 text-grey-darker no-underline"
            to="/starships"
          >
            Starships
          </router-link>
        </div>
      </div>
    </nav>
    <!-- /nav -->
    <div class="w-full px-6 mt-6">
      <div class="container mx-auto max-w-xl md:flex">
        <router-view />
      </div>
    </div>
    <spinner />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import spinner from './components/spinner.vue';

@Component({
  components: {
    spinner
  }
})
export default class App extends Vue {}
</script>
