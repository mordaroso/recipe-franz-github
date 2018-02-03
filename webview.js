module.exports = (Franz) => {
  const fetchDelay = 30 * 1000; // 30 seconds
  let lastFetch = 0;

  // getMessages gets called looped and called every second by Franz
  // This then waits and triggers every 30 seconds the fetchNotifications function
  const getMessages = function getMessages() {
    if(lastFetch + fetchDelay < Date.now()) {
      lastFetch = Date.now();
      fetchNotifications();
    }
  };

  // fetchNotifications initializes a GET AJAX call to http://github/notifications,
  // parses the returned HTML to extract the number of unread notificaitons and
  // returns the result to Franz.setBadge
  const fetchNotifications = function fetchNotifications() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       let element = document.createElement('div');
       element.innerHTML = this.responseText;
       let notifications = element.querySelector('#notification-center .filter-item.selected .count');
       Franz.setBadge(parseInt(notifications.innerHTML));
      }
    };
    request.open("GET", "/notifications", true);
    request.send();
  };

  Franz.loop(getMessages);
};