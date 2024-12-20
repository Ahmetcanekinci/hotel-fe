import select2 from 'select2';
select2(window.$);

import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.tr';

var missing = {
  addEventListener: function() {}
};

export default class customersSlider {
  

    constructor() {

        this.checkInBtn();
        this.enableDatePicker();
        this.enableGuestCounter();
        this.citySelect();
        this.getBarboonValues();
      this.cityOnChangeEvent();
        
    }

    checkInBtn(){

        (document.querySelector(".sticky-button a") || missing).addEventListener("click", function() {
          
          var bodyElement = document.body;
          var headerBottom = document.querySelector(".header-bottom");
          var buttonText = this.querySelector("p");
          var closeButton = document.createElement("span");
      
          bodyElement.classList.toggle("sticky-btn-active");
          headerBottom.classList.toggle("active");
          closeButton.textContent = "x";
          closeButton.classList.add("close-button");
        
          if (buttonText.nextElementSibling && buttonText.nextElementSibling.classList.contains("close-button")) {
          
            buttonText.nextElementSibling.remove();
          
          } else {
          
            buttonText.insertAdjacentElement("afterend", closeButton);
          
          }
      
        });

        const button = (document.querySelector('.sticky-button') || missing);

        setInterval(() => {

          button.classList.add('vibration-effect');
          
          setTimeout(() => {

            button.classList.remove('vibration-effect');

          }, 1000);

        }, 10000);
      
        document.addEventListener("DOMContentLoaded", function() {
          
          var closeButton = (document.getElementById("header-close-btn") || missing);

          closeButton.addEventListener("click", function() {

              var stickyButton = document.querySelector(".sticky-button");
              
              if (stickyButton) {

                  var closeButton = stickyButton.querySelector(".close-button");

                  if (closeButton) {

                      closeButton.remove();

                  }

              }
      
              var bodyElement = document.body;
              var headerBottom = document.querySelector(".header-bottom");
              
              if (headerBottom) {

                  bodyElement.classList.remove("sticky-btn-active");
                  headerBottom.classList.remove("active");

              }

          });

      });

    }
      
    enableDatePicker() {
      
        $(document).ready(function() {
          var today = new Date(); // Bugünkü tarihi al
      
          $('.datepicker').datepicker({
            format: 'dd.mm.yyyy',
            language: 'tr',
            autoclose: true,
            startDate: today, // Bugünkü tarihten önceki tarihleri seçilemez yap
          });
      
          var startDatePicker = $('#start-date');
          var endDatePicker = $('#end-date');
      
          startDatePicker.datepicker().on('changeDate', function(selected) {
            var startDate = new Date(selected.date.valueOf());
            endDatePicker.datepicker('setStartDate', startDate); // İkinci seçeceğim tarih, ilk seçtiğim tarihin gerisinde olamaz
          });
      
          endDatePicker.datepicker().on('changeDate', function(selected) {
            var endDate = new Date(selected.date.valueOf());
            startDatePicker.datepicker('setEndDate', endDate); // İlk seçeceğim tarih, ikinci seçtiğim tarihin ilerisinde olamaz
          });
        });
      
    }
      
    enableGuestCounter(){
      
        var guestCount = 1;
      
        function increaseGuestCount() {
            if (guestCount < 10) {
                guestCount++;
                displayGuestCount();
            }
        }
      
        function decreaseGuestCount() {
            if (guestCount > 1) {
                guestCount--;
                displayGuestCount();
            }
        }
      
        function displayGuestCount() {
            var guestCountElement = document.getElementById("guest-count");
            guestCountElement.innerHTML = guestCount.toString();
        }
      
        (document.getElementById("increase-btn") || missing).addEventListener("click", increaseGuestCount);
        (document.getElementById("decrease-btn") || missing).addEventListener("click", decreaseGuestCount);
      
    }
      
    citySelect(){
          
        $(document).ready(function() {
                
          $('#city').select2({});
      
        });
      
    }
      
    getBarboonValues() {
      
        (document.getElementById("search-btn") || missing).addEventListener("click", function() {
      
          var city = document.getElementById("city").value;
          var startDateInput = document.getElementById("start-date");
          var endDateInput = document.getElementById("end-date");
          var guestCount = document.getElementById("guest-count").innerHTML;
      
          // Başlangıç tarihini yyyy-mm-dd formatında al
          var startDateParts = startDateInput.value.split(".");
          var startDate = startDateParts[2] + "-" + startDateParts[1] + "-" + startDateParts[0];
      
          // Bitiş tarihini yyyy-mm-dd formatında al
          var endDateParts = endDateInput.value.split(".");
          var endDate = endDateParts[2] + "-" + endDateParts[1] + "-" + endDateParts[0];
      
          // URL'yi oluştur

          // var url = "https://test-ui.barboon.net/search-result?"; // TODO: Check this later
          var url = city;
          url += "adultCount=" + guestCount + "&adultCountRoom1=" + guestCount;
          url += "&checkIn=" + startDate + "&checkOut=" + endDate;
          url += "&childCount=0&childCountRoom1=0&currency=TRY&language=EN&roomCount=1";
      
          // Linki aç
          window.open(url);
      
        });
      
    }

    cityOnChangeEvent(){
  
        (document.getElementById("city") || missing).onchange = function() {
          var city = document.getElementById("city").value;
          RenderPrices(city);
        };
      
      
    }
}
