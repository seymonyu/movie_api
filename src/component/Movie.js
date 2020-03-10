import React from "react";
import "./Movie.css";

const url = " https://post-a-form.herokuapp.com/api/movies";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      poster: "",
      comment: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitForm(e) {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    };
    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(
            `Your movie #${this.state.title} was successfully added to our database:)`
          );
        }
      })
      .catch(e => {
        console.error(e);
        alert("System error.");
      });
  }

  render() {
    return (
      <div className="Movie">
        <img
          src="https://icons-for-free.com/iconfiles/png/512/fire-131982518734716771.png"
          alt="cilek"
        />
        <h1>My Favourite Movie</h1>

        <form onSubmit={this.submitForm}>
          <div>
            <h2>Your Data Here</h2>
            <div className="form-data">
              <label htmlFor="title">Movie Name</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="poster">Enter Movie Poster URL</label>
              <input
                type="text"
                id="poster"
                name="poster"
                onChange={this.onChange}
                value={this.state.poster}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="comment">What do you think?</label>
              <textarea
                type="text"
                id="comment"
                name="comment"
                onChange={this.onChange}
                value={this.state.comment}
                required
              />
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Send" onClick={this.submitForm} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Movie;
