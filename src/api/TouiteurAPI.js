const URL = "touiteur.cefim-formation.org";
class TouiteurAPI {
  static getMessages = (success, error, timestamp) => {
    fetch("http://" + URL + "/list?ts=" + encodeURIComponent(timestamp))
      .then(res => res.json())
      .then(
        result => {
          success(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        err => {
          error(err);
        }
      );
  };
  static sendMessages = (name, message) => {
    fetch("http://" + URL + "/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "name=" +
        encodeURIComponent(name) +
        "&message=" +
        encodeURIComponent(message)
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  };
  static trending = (success, error) => {
    fetch("http://" + URL + "/trending")
      .then(res => res.json())
      .then(
        result => {
          success(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        err => {
          error(err);
        }
      );
  };
}

export default TouiteurAPI;
