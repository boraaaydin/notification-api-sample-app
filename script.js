const button = document.getElementById('notifications');
button.addEventListener('click', () => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
        console.log("granted");
      randomNotification();
    }
  });
})

const button2 = document.getElementById('notifications2');
button2.addEventListener('click', () => {
    randomNotification();
    sendNotification();
  })

var games = [
    {
      slug: 'lost-in-cyberspace',
      name: 'Lost in Cyberspace',
      author: 'Zosia and Bartek',
      twitter: 'bartaz',
      website: '',
      github: 'github.com/bartaz/lost-in-cyberspace'
    },
    {
      slug: 'vernissage',
      name: 'Vernissage',
      author: 'Platane',
      twitter: 'platane_',
      website: 'github.com/Platane',
      github: 'github.com/Platane/js13k-2017'
    },
    // ...
    {
      slug: 'emma-3d',
      name: 'Emma-3D',
      author: 'Prateek Roushan',
      twitter: '',
      website: '',
      github: 'github.com/coderprateek/Emma-3D'
    }
  ];

function randomNotification() {
    console.log("randomNotification");
    const randomItem = Math.floor(Math.random() * games.length);
    const notifTitle = games[randomItem].name;
    const notifBody = `Created by ${games[randomItem].author}.`;
    const notifImg = `deneme.png`;
    const options = {
      body: notifBody,
      icon: notifImg,
    };
    
    console.log(notifTitle,options.body,options.icon);
    new Notification(notifTitle, options);
    //setTimeout(randomNotification, 1000);
  }

  sendNotification({
    title: 'New Notification',
    message: 'Your message goes here',
    icon:'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png',
    clickCallback: function () {
      alert('do something when clicked on notification');
    }
  });

  function sendNotification (data) {
    if (data == undefined || !data) { return false }
    var title = (data.title === undefined) ? 'Notification' : data.title
    var clickCallback = data.clickCallback
    var message = (data.message === undefined) ? 'null' : data.message
    var icon = (data.icon === undefined) ? 'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png' : data.icon
    var sendNotification = function (){
        var notification = new Notification(title, {
            icon: icon,
            body: message
        })
        if (clickCallback !== undefined) {
            notification.onclick = function () {
                clickCallback()
                notification.close()
            }
        }
    }

    if (!window.Notification) {
        return false
    } else {
        if (Notification.permission === 'default') {
            Notification.requestPermission(function (p) {
                if (p !== 'denied') {
                    sendNotification()
                }
            })
        } else {
            sendNotification()
        }
    }
}