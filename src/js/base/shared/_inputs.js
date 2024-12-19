export default class Inputs {
    constructor() {
        // this.addFocus();
    }

    addFocus() {
        $(document).ready(function () {
            $('.custom-input').each(function () {
                const $input = $(this);

                const $container = $input.closest('.input-container');

                $input.on('focus', function () {
                    $container.addClass('active');
                });

                $input.on('blur', function () {
                    if ($input.val().trim() === "") {
                        $container.removeClass('active');
                    }
                });
            });
        });
    }
}
