const vue = Vue.createApp({
  data() {
    return {
      restaurantInModal: { name: null },
      restaurants: [],
    };
  },
  async created() {
    this.restaurants = await (
      await fetch("http://localhost:8080/restaurants")
    ).json();
  },
  methods: {
    getRestaurants: async function (id) {
      this.restaurantInModal = await (
        await fetch(`http://localhost:8080/restaurants/${id}`)
      ).json();
      let restaurantInfoModal = new bootstrap.Modal(
        document.getElementById("restaurantInfoModal"),
        {}
      );
      restaurantInfoModal.show();
    },
  },
}).mount("#app");
