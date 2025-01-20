<template>
  <div>
    <h2>Car List</h2>
    <ul>
      <li v-for="car in cars" :key="car.id">
        <router-link :to="'/car/' + car.id">{{ car.name }} - {{ car.price }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCarStore } from '../store/carStore';

export default {
  data() {
    return {
      cars: []
    };
  },
  methods: {
    async fetchCars() {
      const carStore = useCarStore();
      await carStore.fetchCars();
      this.cars = carStore.cars;
    }
  },
  mounted() {
    this.fetchCars();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: blue;
}
</style>
