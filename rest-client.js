const vue = Vue.createApp({
  data() {
    return {
      restaurantInModal: { id: null, name: null, price: null },
      restaurants: [],
      booking_date: null,
      booking_time: null,
      customer_name: null,
    };
  },
  async created() {
    this.restaurants = await (
      await fetch("http://localhost:8080/restaurants")
    ).json();
  },
  methods: {
    async getRestaurants(id) {
      this.restaurantInModal = await (
        await fetch(`http://localhost:8080/restaurants/${id}`)
      ).json();
      let restaurantInfoModal = new bootstrap.Modal(
        document.getElementById("restaurantInfoModal"),
        {}
      );
      restaurantInfoModal.show();
    },
    async handleBooking() {
      const bookingDateInput = window.document.getElementById("booking_date");
      const bookingTimeInput = window.document.getElementById("booking_time");
      const customerNameInput = window.document.getElementById("customer_name");
    
      if (!bookingDateInput || !bookingTimeInput || !customerNameInput) {
        console.log("Booking canceled or invalid input.");
        return;
      }
    
      const booking_date = bookingDateInput.value;
      const booking_time = bookingTimeInput.value;
      const customer_name = customerNameInput.value;
    
      window.close();
    
      this.bookTable(booking_date, customer_name, booking_time);
    }
    ,
    async bookTable(booking_date, customer_name, booking_time) {
      try {
        const response = await fetch("http://localhost:8080/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurantId: this.restaurantInModal.id,
            booking_date,
            booking_time,
            customer_name,
          }),
        });

        if (response.ok) {
          console.log("Booking successful");
          alert("Booking successful!");
        } else {
          console.error("Booking failed");
          alert("Booking failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    },
  },
}).mount("#app");
