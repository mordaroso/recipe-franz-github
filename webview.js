module.exports = (Franz) => {
  const getMessages = function getMessages() {
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