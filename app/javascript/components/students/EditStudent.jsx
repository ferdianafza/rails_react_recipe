import React from "react";
import { Link } from "react-router-dom";


class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      student: { ingredients: "" }
       };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
      const {
        match: {
        params: { id }
        }
      } = this.props;
    event.preventDefault();
    const url = `/api/v1/student/${id}`;
    const { name, ingredients, instruction } = this.state;

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>")
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/students`))
      .catch(error => console.log(error.message));
  }

componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/student/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ student: response }))
      .catch(() => this.props.history.push("/students"));
  }

 addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

render() {
    const { student } = this.state;
    let ingredientList = "No ingredients available";

    if (student.ingredients.length > 0) {
      ingredientList = student.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const studentInstruction = this.addHtmlEntities(student.instruction);

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Update a  student to our awesome student collection.
            </h1>
              <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="recipeName">Student name</label>
                <input
                  type="text"
                  name="name"
                  id="recipeName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeIngredients">Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  id="recipeIngredients"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="ingredientsHelp" className="form-text text-muted">
                  Separate each ingredient with a comma.
                </small>
              </div>
              <label htmlFor="instruction">Preparation Instructions</label>
              <textarea
                className="form-control"
                id="instruction"
                name="instruction"
                rows="5"
                required
                onChange={this.onChange}
              />
              <button type="submit" className="btn custom-button mt-3">
                Update Student
              </button>
              <Link to="/students" className="btn btn-link mt-3">
                Back to students
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;