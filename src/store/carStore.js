import { defineStore } from 'pinia';
import audi_etron from '@/pictures/audi_etron.jpg';
import tesla_s from '@/pictures/teslaS.jpg';
import bmw_i4 from '@/pictures/bmw_i4.jpg';
import taycan from '@/pictures/taycan.jpg';
import mercedes_s from '@/pictures/mercedes_S.jpg';
import golf_8 from '@/pictures/golf_8.jpg';
import volvo_xc90 from '@/pictures/volvo_xc90.jpg';
import mercedes_gle from '@/pictures/mercedes_gle.jpg';

export const useCarStore = defineStore('carStore', {
  state: () => ({
    cars: [],
  }),
  actions: {

    async fetchCars() {
      this.cars = await new Promise(resolve => {
        setTimeout(() => resolve([
          {
            id: 1,
            name: 'Tesla Model S',
            price: '99,000 €',
            image: tesla_s,
            model: 'Model S',
            year: 2023,
            engine: '3-phase alternating current induction motor',
            mileage: 1200
          },
          {
            id: 2, 
            name: 'BMW i4', 
            price: '55,400 €', 
            image: bmw_i4,
            model: 'i4',
            year: 2022,
            engine: '3-phase electrically excited synchronous motor',
            mileage: 1000
          },
          {
            id: 3, 
            name: 'Audi e-tron', 
            price: '65,000 €', 
            image: audi_etron,
            model: 'e-tron GT',
            year: 2022,
            engine: '90-kWh lithium-ion battery',
            mileage: 4890
          },

          {
            id: 4, 
            name: 'Porsche Taycan', 
            price: '189,700 €', 
            image: taycan,
            model: 'Turbo S',
            year: 2024,
            engine: '93.4 kWh (83.7 kWh usable) liquid-cooled lithium-ion',
            mileage: 6500
          },

          {
            id: 5, 
            name: 'Mercedes S class', 
            price: '136,900 €', 
            image: mercedes_s,
            model: 'S63 sedan',
            year: 2023,
            engine: 'Twin Turbo Gas V-8',
            mileage: 7688
          },

          {
            id: 6, 
            name: 'Golf VIII', 
            price: '55,000 €', 
            image: golf_8,
            model: 'GTD',
            year: 2021,
            engine: '2.0L Diesel',
            mileage: 14500
          },

          {
            id: 7, 
            name: 'Volvo XC90', 
            price: '85,000 €', 
            image: volvo_xc90,
            model: 'XC 90',
            year: 2024,
            engine: '2.4 L turbo',
            mileage: 1900
          },

          {
            id: 8,
            name: 'Mercedes GLE Coupe', 
            price: '$120,000 €', 
            image: mercedes_gle,
            model: '350de 4MATIC',
            year: 2025,
            engine: '3.5 L V6',
            mileage: 5600
          },
          
        ]), 100);
      });
      console.log('Fetched cars:', this.cars);
    }

  },
});
