
export default class Form {
    constructor() {
        if (document.querySelector("form")) {
            this.preventNumericInput();
            this.preventNonNumericInput();
            this.handlePhoneMask();
        }
    }
    preventNumericInput() {
        var nonAlphaInputs = document.getElementsByClassName("non-numeric");

        for (var i = 0; i < nonAlphaInputs.length; i++) {
            nonAlphaInputs[i].addEventListener("keypress", function (e) {
                e = e || window.event;
                var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
                var charStr = String.fromCharCode(charCode);

                // Harf karakterlerine ve boşluk karakterine izin vermek için kontrolü güncelle
                if (!/^[a-zA-ZçÇğĞıIiİıöÖşŞüÜ\s]+$/.test(charStr)) {
                    e.preventDefault(); // Karakterin girişini engelle
                }
            });
        }
    }
    preventNonNumericInput() {
        var numericInputs = document.getElementsByClassName("numeric-input");

        for (var i = 0; i < numericInputs.length; i++) {
            numericInputs[i].addEventListener("input", function (e) {
                var inputValue = e.target.value;

                // Use a regular expression to remove non-numeric characters
                var numericValue = inputValue.replace(/[^0-9]/g, "");

                // Update the input value with the numeric value
                e.target.value = numericValue;
            });
        }
    }
    handlePhoneMask() {
        $(document).ready(function () {
            const phoneMaskOptions = {
                mask: '(000) 000 00 00',
                lazy: false
            };
        });
    }
}



