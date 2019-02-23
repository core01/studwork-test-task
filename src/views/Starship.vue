<template>
  <div>
    <h1>{{ ship.name }}</h1>
    <ul class="list-reset">
      <li v-for="(value, key) in ship" :key="key">
        <b>{{ key }}</b> : {{ value }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Starship extends Vue {
  ship: Starship | object = {};

  mounted() {
    this.$store.commit('SET_LOADING', true);
    axios
      .get('https://swapi.co/api/starships/' + this.$route.params.id + '/')
      .then(response => {
        this.ship = response.data;
        this.$store.commit('SET_LOADING', false);
      })
      .catch(() => {
        (this as any).$noty.error('Упс! Ошибочка вышла, попробуйте позже!');
        // TODO add error log
      });
  }
}
</script>
