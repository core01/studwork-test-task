<template>
  <div class="w-full">
    <div class="my-2">
      <div class="flex">
        <div class="w-full sm:w-4/5">
          <input
            id="search"
            v-model="searchInput"
            class="input border rounded w-full p-2"
            type="search"
            name="search"
            placeholder="Search"
          >
        </div>
        <div class="w-full sm:w-1/5 flex justify-end">
          <button
            class="bg-blue hover:bg-blue-dark text-white py-2 px-4 rounded mr-5"
            :disabled="current === 1"
            :class="{ 'opacity-50 cursor-not-allowed': current === 1 }"
            @click.prevent="prevPage"
          >Prev</button>
          <button
            class="bg-blue hover:bg-blue-dark text-white py-2 px-4 rounded"
            :disabled="!next"
            :class="{ 'opacity-50 cursor-not-allowed': !next }"
            @click.prevent="nextPage"
          >Next</button>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap grids">
      <div v-for="starship in starships" :key="starship.name" class="w-1/2 grid">
        <div class="space-grid bg-white flex flex-col border rounded justify-between p-2">
          <router-link
            tag="h4"
            class="text-center"
            :to="{
              name: 'starship',
              params: { id: getId(starship.url) }
            }"
          >
            <a>{{ starship.name }}</a>
          </router-link>
          <p class="text-center text-grey-darkest my-2">{{ starship.model }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState(['starships', 'current', 'next'])
})
export default class Starships extends Vue {
  starships!: Starships[];
  next!: number | null;
  current!: number;
  timerId: number = 0;
  searchInput: string = '';
  page: number = 1;

  /**
   * Trim input string for search
   */
  get trimmedInput(): string {
    return this.searchInput.trim();
  }

  /**
   * Get id from url
   */
  getId(url: string): number {
    return +url.replace(/[^0-9]/g, '');
  }

  @Watch('searchInput')
  onSearchInputChanged() {
    // cancel previous call if it was set
    this.timerId && clearTimeout(this.timerId);

    this.timerId = setTimeout((): void => {
      /**
       * Set search params to the store and fire getShips()
       */
      this.$store.commit('SET_QUERY', this.trimmedInput);
      this.$store.commit('SET_CURRENT_PAGE', 1);
      this.updateRouterQuery();
      this.$store.dispatch('getShips');
    }, 500);
  }

  /**
   * Push query params to the router
   */
  updateRouterQuery(): void {
    this.$router.push({
      query: { search: (this as any).trimmedInput, page: (this as any).current }
    });
  }

  /**
   * Move to the next page
   */
  nextPage(): void {
    if (this.next) {
      this.$store.commit('SET_CURRENT_PAGE', this.current + 1);
      this.updateRouterQuery();
      this.$store.dispatch('getShips');
    }
  }

  /**
   * Move to the previous page
   */
  prevPage(): void {
    if (this.current > 1) {
      this.$store.commit('SET_CURRENT_PAGE', this.current - 1);
      this.updateRouterQuery();
      this.$store.dispatch('getShips');
    }
  }

  mounted() {
    // reset defaults
    this.$store.commit('SET_QUERY', '');
    this.$store.commit('SET_CURRENT_PAGE', 1);

    const searchQuery = this.$route.query.search as string;
    const page = parseInt(this.$route.query.page as string, 10);

    if (searchQuery) {
      this.searchInput = searchQuery;
      this.$store.commit('SET_QUERY', searchQuery);
    }

    if (page) {
      this.$store.commit('SET_CURRENT_PAGE', page);
    }

    this.$store.dispatch('getShips');
  }
}
</script>
<style lang="postcss" scoped>
.space-grid {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.grid:nth-child(2n) .space-grid {
  margin-left: 0.5rem;
}
</style>
