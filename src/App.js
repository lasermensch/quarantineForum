import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import { Navbar } from './app/navbar';
import { AddCategoryForm } from './features/categories/addCategoryForm';
import { CategoriesList } from './features/categories/categoriesList';
import { SingleCategoryPage } from './features/categories/singleCategoryPage';
import { SingleThreadPage } from './features/threads/singleThreadPage';
import {AddCommentForm} from './features/comments/addCommentForm'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" render={() =>(
            <React.Fragment>
              <AddCategoryForm />
              <CategoriesList />
            </React.Fragment>
          )}/>
          <Route exact path="/categories/:id" component={SingleCategoryPage} />
          <Route exact path="/threads/:id" component={SingleThreadPage} />
          <Route exact path="/thread/:id/comment" component={AddCommentForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
