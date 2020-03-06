import React from "react";
import { Link } from "react-router-dom";

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: { ingredients: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
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

 deleteStudent() {
     const {
       match: {
        params: { id }
       }
     } = this.props;
     const url = `/api/v1/student/destroy/${id}`;
     const token = document.querySelector('meta[name="csrf-token"]').content;

     fetch(url, {
       method: "DELETE",
       headers: {
         "X-CSRF-Token": token,
         "Content-Type": "application/json"
       }
     })
       .then(response => {
         if (response.ok) {
           return response.json();
         }
         throw new Error("Network response was not ok.");
       })
       .then(() => this.props.history.push("/students"))
       .catch(error => console.log(error.message));
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
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={student.image}
            alt={`${student.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {student.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${studentInstruction}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteStudent}>
                Delete Student
              </button>
            </div>
          </div>
          <Link to="/students" className="btn btn-link">
            Back to students
          </Link>
        </div>
      </div>
    );
  }
}

export default Student;