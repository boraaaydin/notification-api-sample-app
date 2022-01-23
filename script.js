const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("service-worker.js");
  return swRegistration;
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission()
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    alert('Permission not granted for Notification')
    throw new Error('Permission not granted for Notification')
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
        console.log("granted");
        showNotification();
      }
    });
  });
};

const checkBrowserCompatibility = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

function showNotification() {
  try {
    const options = {
      body: "body",
      icon: "https://www.iconninja.com/files/926/373/306/link-chain-url-web-permalink-web-address-icon.png",
    };
    const n = new Notification("Here is notification", options);
  } catch (error) {
    console.log(error);
  }
}

const main = async () => {
  await registerServiceWorker();
  await requestNotificationPermission();
  checkBrowserCompatibility();
  addEventListenerForButton();
};
main();