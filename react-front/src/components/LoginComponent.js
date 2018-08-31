import React from 'react';
import { Link } from 'react-router-dom';

// It is presentational UI for Login page.
export const LoginComponent = props =>
  (
    <div className="container">
      <h1>LOGIN</h1>
      {props.errors && <div className="mt-2 mb-2 alert alert-danger">{props.errors}</div>}
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label> Email: </label>
          <input className="form-control" required type="email" name="email" value={props.email} onChange={props.handleChange} />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input className="form-control" required type="password" name="password" value={props.password} onChange={props.handleChange}/>
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <Link to="/Signup" className="mt-3 ml-2">Not Registered?</Link>
        </div>
      </form>
    </div>
  )
