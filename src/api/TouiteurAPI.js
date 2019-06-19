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
        return response.json();
      })
      .then(function(data) {
        if (data.success === true) {
          alert("Message sent");
        } else {
          alert(data.error);
        }
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
  static influencers = (success, error) => {
    let numberInfluencers = 10;
    fetch("http://" + URL + "/influencers?count=" + numberInfluencers)
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
  static sendComment = (name, comment, messageId) => {
    fetch("http://" + URL + "/comments/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "name=" +
        encodeURIComponent(name) +
        "&comment=" +
        encodeURIComponent(comment) +
        "&message_id=" +
        encodeURIComponent(messageId)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success === true) {
          alert("Comment sent");
        } else {
          alert(data.error);
        }
      });
  };
  static sendLikes = messageId => {
    fetch("http://" + URL + "/likes/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "&message_id=" + encodeURIComponent(messageId)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success === true) {
          alert("Message sent");
        } else {
          alert(data.error);
        }
      });
  };
  static deleteLikes = messageId => {
    fetch("http://" + URL + "/likes/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "&message_id=" + encodeURIComponent(messageId)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success === true) {
          alert("Message sent");
        } else {
          alert(data.error);
        }
      });
  };
}

export default TouiteurAPI;
