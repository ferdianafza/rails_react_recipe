import React from "react";
import { Link } from "react-router-dom";


class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/students/index";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ students: response }))
        .catch(() => this.props.history.push("/"));
  }

  render() {
    const { students } = this.state;
    const allStudents = students.map((student, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={student.image}
            className="card-img-top"
            alt={`${student.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{student.name}</h5>
            <Link to={`/student/${student.id}`} className="btn custom-button">
              View Student
            </Link> 
          </div>
        </div>
      </div>
    ));
    const noStudent = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No students yet. Why not <Link to="/new_student">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Students for every occasion</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular students, our latest
              additions, and our editor’s picks, so there’s sure to be something
              tempting for you to try.
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/student" className="btn custom-button">
                Create New Student
              </Link>
            </div>
            <div className="row">
              {students.length > 0 ? allStudents : noStudent}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }

}
export default Students;