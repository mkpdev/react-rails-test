import React from 'react';
import { Link } from 'react-router-dom';

// It is presentational UI for add/edit form.
export const AddEditUserComponent = props => 
  (
    <div className="container">
      <Link to="/dashboard">Back to dashboard</Link>
      <h1>Edit</h1>
      {props.errors && <div className="mt-2 mb-2 alert alert-danger">{props.errors}</div>}
      <div>
        <form onSubmit={props.handleSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input className="form-control" type="email" required name="email" placeholder=" " value={props.user.email} onChange={props.handleChange} />
          </div>
          <div className="form-group">
            <label>Name: </label>               
            <input className="form-control" type="text" name="name" required value={props.user.name} onChange={props.handleChange} />
          </div>
          <div className="form-group">
            <label>Role: </label>
            <select className="form-control" name='role' required value={props.user.role} onChange={props.handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )