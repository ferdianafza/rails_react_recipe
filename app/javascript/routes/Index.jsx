import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";

import Students from "../components/students/Students";
import Student from "../components/students/Student";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
	  <Route path="/recipe/:id" exact component={Recipe} />
	  <Route path="/recipe" exact component={NewRecipe} />

	  <Route path="/students" exact component={Students} />
	  <Route path="/student" exact component={Student} />
    </Switch>
  </Router>
);
