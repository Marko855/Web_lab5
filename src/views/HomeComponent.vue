<template>
  <div>
    <h2 class="title">Explore Our Cars</h2>
    <div class="car-list">
      <div v-for="car in cars" :key="car.id" class="car-item">
        <router-link :to="'/car/' + car.id">
          <div class="car-card">
            <img :src="car.image" alt="Car Image" class="car-image" />
            <h3>{{ car.name }}</h3>
            <p class="car-price">{{ car.price }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useCarStore } from '../store/carStore';
import { onMounted, reactive } from 'vue';

export default {
  name: 'HomeComponent',
  setup() {
    const carStore = useCarStore();
    const cars = reactive([]);

    onMounted(async () => {
      await carStore.fetchCars();
      cars.push(...carStore.cars);

    });

    return {
      cars,
    };
  },
};
</script>


<style scoped>
.title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #444;
  font-weight: bold;
}

.car-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.car-item {
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.car-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.car-card:hover {
  transform: scale(1.05);
}

.car-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.car-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.car-card h3 {
  font-size: 20px;
  color: #444;
  margin-top: 10px;
}

.car-rating {
  font-size: 16px;
  color: #555;
}
</style>
