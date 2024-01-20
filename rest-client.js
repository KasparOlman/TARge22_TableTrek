const vue = Vue.createApp({
  data() {
    return {
      restaurantInModal: { id: null, name: null, price: null },
      restaurants: [],
      bookingDate: null,
      bookingTime: null,
      customerName: null,
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
    openBookingWindow() {
      const bookingWindow = window.open(
        "",
        "BookingWindow",
        "width=400,height=200"
      );
      bookingWindow.document.write(`
      <form action="http://localhost:8080/bookings" method="POST">
        <label for="bookingDate">Booking Date:</label>
        <input type="date" id="bookingDate" placeholder="YYYY-MM-DD HH:mm"><br>
        <label for="bookingTime">Booking Time:</label>
        <input type="time" id="bookingTime"><br>
        <label for="customerName">Your Name:</label>
        <input type="text" id="customerName" placeholder="Your Name"><br>
        <button type="submit">Book Table</button> 
        </form>
        `);
        
    },
    handleBooking() {
      const bookingDateInput = window.document.getElementById("bookingDate");
      const customerNameInput = window.document.getElementById("customerName");

      if (!bookingDateInput || !customerNameInput) {
        console.log("Booking canceled or invalid input.");
        return;
      }

      const bookingDate = bookingDateInput.value;
      const bookingTime = bookingDateInput.value;
      const customerName = customerNameInput.value;

      window.close();

      this.bookTable(bookingDate, customerName, bookingTime);
    },
    async bookTable(bookingDate, customerName, bookingTime) {
      try {
        const response = await fetch("http://localhost:8080/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurantId: this.restaurantInModal.id,
            bookingDate,
            bookingTime,
            customerName,
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
