const app = Vue.createApp({
  data() {
    return {
      restaurants: [],
      restaurantInModal: {},
    };
  },
  methods: {
    async getRestaurant(id) {
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.restaurantInModal = await response.json();
        let restaurantInfoModal = new bootstrap.Modal(
          document.getElementById("restaurantInfoModal")
        );
        restaurantInfoModal.show();
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    },
  },
  async created() {
    try {
      const response = await fetch("http://localhost:8080/restaurants");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.restaurants = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
});
app.mount("#app");
