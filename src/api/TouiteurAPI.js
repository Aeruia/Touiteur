const URL = "touiteur.cefim-formation.org";
class TouiteurAPI {
  //Get messages
  static getMessages = (success, error, timestamp) => {
    fetch("http://" + URL + "/list?ts=" + encodeURIComponent(timestamp))
      .then(res => res.json())
      .then(
        result => {
          success(result);
        },
        err => {
          error(err);
        }
      );
  };
  //Send messages
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
  // Get the words that are most used
  static trending = (success, error) => {
    fetch("http://" + URL + "/trending")
      .then(res => res.json())
      .then(
        result => {
          success(result);
        },
        err => {
          error(err);
        }
      );
  };
  //Get the users with the most messages
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
  //Send comments for message with given message ID
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
  //Get comments for message with given message ID
  static getComments = (success, error, messageId) => {
    fetch(
      "http://" +
        URL +
        "/comments/list?message_id=" +
        encodeURIComponent(messageId)
    )
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
  //Send like for message
  static sendLikes = messageId => {
    fetch("http://" + URL + "/likes/send", {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "message_id=" + encodeURIComponent(messageId)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success === true) {
          alert("Liked");
        } else {
          alert(data.error);
        }
      });
  };
  //Delete like for message
  static deleteLikes = messageId => {
    fetch("http://" + URL + "/likes/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "message_id=" + encodeURIComponent(messageId)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success === true) {
          alert("Unliked");
        } else {
          alert(data.error);
        }
      });
  };
}

export default TouiteurAPI;
