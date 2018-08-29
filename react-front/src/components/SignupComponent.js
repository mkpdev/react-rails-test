import React from 'react';
import { Link } from 'react-router-dom';

export const SignupComponent = props =>
(
	<div className="container">
    <h1>Sign Up</h1>
    {props.errors && <div className="mt-2 mb-2 alert alert-danger">{props.errors}</div>}
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label>Name: </label>
        <input className="form-control" type="text" required name="name" value={props.name} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <label>Email: </label>
        <input className="form-control" type="email" required name="email" value={props.email} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input className="form-control" type="password" name="password" minLength='8' required value={props.password} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <label> Confirm Password: </label>
        <input className="form-control" type="password" name="confirmPassword" required value={props.confirmPassword} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <label>Role: </label>
        <select onChange={props.handleChange} value={props.role} className="form-control" name="role">
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
      </div>
      <div className="form-group">  
        <input className="btn btn-primary" type="submit" value="Submit" />
        <Link to="/" className="mt-3 ml-2">Already have an account?</Link>
      </div>
    </form>
  </div>
);
