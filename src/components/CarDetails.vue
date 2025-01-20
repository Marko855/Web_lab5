<template>
  <div class="car-details">
    <div v-if="isLoading">Loading...</div>

    <h2 v-if="car.name">{{ car.name }}</h2>
    <p v-if="car.price">Price: {{ car.price }}</p>
    <img v-if="car.image" :src="car.image" alt="Car Image" class="car-detail-image" />
    <p v-else>Car not found.</p>

    <div v-if="car.name">
      <h3>Rate this Car:</h3>
      <select v-model="car.rating" class="rating-select" @change="emitRatingChange">
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>
      <p><strong>Current Rating:</strong> {{ car.rating }} / 5</p>
    </div>

    <div class="additional-details" v-if="car.name">
      <h3>Details:</h3>
      <p><strong>Model:</strong> {{ car.model }}</p>
      <p><strong>Year:</strong> {{ car.year }}</p>
      <p><strong>Engine:</strong> {{ car.engine }}</p>
      <p><strong>Mileage:</strong> {{ car.mileage }} km</p>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, computed } from 'vue';
import { useCarStore } from '../store/carStore';

export default {
  setup(props, { emit }) {
    const route = useRoute();
    const carStore = useCarStore();
    const car = ref(null);
    const isLoading = ref(true);

    const savedRating = computed(() => {
      const carId = car.value ? car.value.id : null;
      if (carId) {
        return sessionStorage.getItem(`carRating_${carId}`);
      }
      return null;
    });

    const updateCarDetails = () => {
      const carId = parseInt(route.params.id);
      const foundCar = carStore.cars.find((c) => c.id === carId);

      car.value = foundCar || { name: 'Car not found', price: '', image: '', rating: 1 };
      isLoading.value = false;

      if (savedRating.value) {
        car.value.rating = parseInt(savedRating.value);
      }
    };

    watch(() => route.params.id, updateCarDetails, { immediate: true });

    onMounted(() => {
      if (carStore.cars.length === 0) {
        carStore.fetchCars().then(updateCarDetails);
      } else {
        updateCarDetails();
      }
    });

    const emitRatingChange = () => {
      if (car.value) {
        sessionStorage.setItem(`carRating_${car.value.id}`, car.value.rating);
        
        emit('rating-changed', { id: car.value.id, rating: car.value.rating });
      }
    };

    return {
      car,
      isLoading,
      emitRatingChange,
      savedRating,
    };
  },
};
</script>


<style scoped>
.car-detail-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
}

.additional-details {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.additional-details h3 {
  color: #333;
  margin-bottom: 10px;
}

.additional-details p {
  margin: 5px 0;
  font-size: 16px;
}

.rating-select {
  padding: 8px;
  font-size: 16px;
}
</style>
