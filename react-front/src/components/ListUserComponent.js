import React from 'react';
import { Link } from 'react-router-dom';

export const ListUserComponent = props => 
  (
  <div>
    <div>
      <h1>Hello Admin!!</h1>
    </div>
    <div>
     <Link to="/create" data-toggle="create user" data-placement="left" title="Create!">Add New User</Link>
      <div className="float-right mb-3">
        <select name="filter_by_role" onChange={(e) => props.filterUsers(e, 'role')}>
          <option value="">Filter By Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="search" name='search' onChange={props.handleChange} />
        <button onClick={props.filterUsers}>Search</button>
      </div>
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {props.allUsers.map((d, i) => {
        return(<tr key={i}>
          <td>
            {d.name}
          </td>
          <td>
            {d.email}
          </td>
          <td>
            {d.role}
          </td>
          <td>
            <Link to={`/edit/${d.id}`} className="btn btn-primary">Edit</Link>
            <button className="btn btn-danger ml-2" onClick={() => props.handleClick(d.id)}>Delete</button>
          </td>
        </tr>)})}
      </tbody>
    </table>
    <div>
      {props.totalPages > 1 && [...Array(props.totalPages)].map((e, i) => {
        console.log("i", i);
        return(<button className={i+1 === props.currentPage ? 'btn-primary ml-2' : 'ml-2'} key={i} onClick={() => props.nextPage(i+1)}>{i+1}</button>)
      })}
    </div>
  </div>
  )
