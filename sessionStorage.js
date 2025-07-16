document.addEventListener('DOMContentLoaded', function () {
        const loadingScreen = document.getElementById('loading-screen');

        // Check if loading screen has already been shown
        if (sessionStorage.getItem('loadingScreenShown')) {
            // Skip loading screen
            loadingScreen.classList.add('hide');
        } else {
            // Show loading screen for a few seconds
            setTimeout(() => {
                loadingScreen.classList.add('hide');
                sessionStorage.setItem('loadingScreenShown', 'true');
            }, 2000); // Customize duration (in ms)
        }
    });