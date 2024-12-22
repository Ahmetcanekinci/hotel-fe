import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.tr';

export default class customersSlider {
  constructor() {
    this.enableDatePicker();
    this.enableGuestCounter();
    this.getCheckInValues();
  }

  enableDatePicker() {

    $(document).ready(function () {
      var today = new Date();

      $('.datepicker').datepicker({
        format: 'dd.mm.yyyy',
        language: 'tr',
        autoclose: true,
        startDate: today,
      });

      var startDatePicker = $('#check_in');
      var endDatePicker = $('#check_out');

      startDatePicker.datepicker().on('changeDate', function (selected) {
        var startDate = new Date(selected.date.valueOf());
        endDatePicker.datepicker('setStartDate', startDate);
      });

      endDatePicker.datepicker().on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        startDatePicker.datepicker('setEndDate', endDate);
      });
    });

  }
  enableGuestCounter() {
    let guestCount = 1;

    const updateGuestDisplay = () => {
      const guestCountElement = document.getElementById("guest_count");
      if (guestCountElement) {
        guestCountElement.textContent = guestCount.toString();
      }
    };

    const increaseGuestCount = () => {
      if (guestCount < 10) {
        guestCount++;
        updateGuestDisplay();
      }
    };

    const decreaseGuestCount = () => {
      if (guestCount > 1) {
        guestCount--;
        updateGuestDisplay();
      }
    };

    const increaseButton = document.getElementById("increase_button");
    const decreaseButton = document.getElementById("decrease_button");

    if (increaseButton) {
      increaseButton.addEventListener("click", increaseGuestCount);
    }

    if (decreaseButton) {
      decreaseButton.addEventListener("click", decreaseGuestCount);
    }

    updateGuestDisplay();
  }
  getCheckInValues() {

    (document.getElementById("search_button") || missing).addEventListener("click", function () {

      // var city = document.getElementById("city").value;
      var city = "istanbul";
      var startDateInput = document.getElementById("check_in");
      var endDateInput = document.getElementById("check_out");
      var guestCount = document.getElementById("guest_count").innerHTML;

      var startDateParts = startDateInput.value.split(".");
      var startDate = startDateParts[2] + "-" + startDateParts[1] + "-" + startDateParts[0];

      var endDateParts = endDateInput.value.split(".");
      var endDate = endDateParts[2] + "-" + endDateParts[1] + "-" + endDateParts[0];

      var url = city;
      url += "adultCount=" + guestCount + "&adultCountRoom1=" + guestCount;
      url += "&checkIn=" + startDate + "&checkOut=" + endDate;
      url += "&childCount=0&childCountRoom1=0&currency=TRY&language=EN&roomCount=1";

      window.open(url);
    });
  }
}
