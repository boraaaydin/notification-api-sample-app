import { logInfo, logError } from "./common.js";

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("service-worker.js", {
    type: 'module',
  });
  if(!swRegistration){
    logError("Service worker not registered");
  }
  return swRegistration;
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission()
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    logError('Permission not granted for Notification');
  }
}

// const checkNotificationPermissions = () => {
//   if (Notification.permission === "granted") {
//     showNotification();
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then((permission) => {
//       if (permission === "granted") {
//         showNotification();
//       }
//     });
//   }
// };

const addEventListenerForButton = () => {
  const button = document.getElementById("notifications");
  button.addEventListener("click", () => {
    console.log("button clicked");
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        showNotification();
      }
      else{
        logInfo("Permision is not granted")
      }
    });
  });
};

const checkBrowserCompatibility = () => {
  if (!("serviceWorker" in navigator)) {
    logError("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    logError("No Push API Support!");
  }
};


// function showNotification() {
//   logInfo("notification will be shown");
//   try {
//     const options = {
//       body: "body",
//       icon: "https://www.iconninja.com/files/926/373/306/link-chain-url-web-permalink-web-address-icon.png",
//     };
//     const n = new Notification("Here is notification", options);
//   } catch (error) {
//     logError(error);
//   }
// }


function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        console.log("serviceWorker");
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: 'https://www.iconninja.com/files/926/373/306/link-chain-url-web-permalink-web-address-icon.png',
          // vibrate: [200, 100, 200, 100, 200, 100, 200],
          // tag: 'vibration-sample'
        });
      });
    }
  });
}

const main = async () => {
  await registerServiceWorker();
  await requestNotificationPermission();
  checkBrowserCompatibility();
  addEventListenerForButton();
};
main();