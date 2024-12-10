export default class Passive {

    constructor() {

        window.passiveSupported = false;

        try {
            const options = {
                get passive() { // This function will be called when the browser
                                //   attempts to access the passive property.
                window.passiveSupported = true;
                return false;
                }
            };

            window.addEventListener("test", null, options);
            window.removeEventListener("test", null, options);

        } catch(err) {
            window.passiveSupported = false;
        }
        
    }

}