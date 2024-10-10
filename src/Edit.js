import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Message from './Message.js';
import './editlist.css'

function Edit() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: '', content: '' });
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await fetch(`https://reqres.in/api/users/${id}`);
    if (res.ok) {
      const users = await res.json();
      setUser(users.data);
    } else {
      
      setMessage({ type: 'error', content: 'Failed to fetch user' });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setMessage({ type: 'success', content: 'User updated successfully!' });
      setTimeout(() => navigate('/users'), 2000);
    } else {
      const errorData = await response.json();
      setMessage({ type: 'error', content: errorData.error || "Can't Update User" });
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      {message.content && (
        <Message type={message.type} message={message.content} onClose={() => setMessage({ type: '', content: '' })} />
      )}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          required
          placeholder="First Name"
        /><br></br>
        <input
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          required
          placeholder="Last Name"
        /><br></br>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          placeholder="Email"
        /><br></br>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Edit;
