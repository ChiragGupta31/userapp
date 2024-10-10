import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './userslist.css'; 
import Message from './Message.js';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
 
  const [message, setMessage] = useState('');

  const fetchUsers = async (page) => {
   
    
      const res = await fetch(`https://reqres.in/api/users?page=${page}`);
      
      if (res.ok){
      const userlist = await res.json();

      setUsers(userlist.data); // Set the users for the current page
      setTotalPages(userlist.total_pages); // Set the total pages available
      setMessage({ type: 'success', content: 'Users loaded successfully!' });
    } else {
      setMessage({ type: 'error', content: 'Failed to fetch users' });
    } 
  };

  useEffect(() => {
    fetchUsers(page); // Fetch users whenever the page changes
  }, [page]);


  // pagination functions
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  // deleting the user data 
  const handleDelete = async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers(users.filter(user => user.id !== id));
      
      setMessage({ type: 'success', content: 'User deleted successfully!' });
    } else {
      setMessage({ type: 'error', content: 'Failed to delete user' });
    }
  };


  

  
  return (
    <div className="usertable">
      <h2>User List</h2>
      {message.content && (
        <Message type={message.type} message={message.content} onClose={() => setMessage({ type: '', content: '' })} />
      )}
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                <Link  className="actionbtn editbtn" to={`/edit/${user.id}`}><i className="fas fa-edit"></i>Edit</Link>
                <button className='actionbtn deletebtn' onClick={() => handleDelete(user.id)}>
                <i className="fas fa-trash-alt">
                </i>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
