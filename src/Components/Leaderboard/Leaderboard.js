import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import '../../Leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState('');
  const [userRank, setUserRank] = useState(0);

  // Creates a data row for each user with their rank, username, and total uploads
  const renderTable = (user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className="lb-name">{user.username}</td>
      <td>{dropdownSelection ? user.itemCount : user.totalUploads}</td>
    </tr>
  )

  // Sorts users by total uploads
  useEffect(() => {
    const link = dropdownSelection ? `http://localhost:3001/leaderboard/${dropdownSelection}` : 'http://localhost:3001/leaderboard';
    axios.get(link)
      .then((response) => {
        setLeaderboardData(response.data.leaderboard);
        setUserRank(response.data.rank);
      })
      .catch((err) => console.log(err));
  }, [dropdownSelection])


  return (
    <div className="lb-container">
      <Dropdown setCategory={setDropdownSelection} />
      <div className="lb-user-stats">
        <h3>Your rank: 9999</h3>
        <h3>Total: 99999999</h3>
      </div>
      <table className="lb-table">
        <thead>
          <tr className="lb-header">
            <th scope="col">Rank</th>
            <th scope="col" className="lb-header-name">Name</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
      <tbody>
        {leaderboardData.map((user, index) => (renderTable(user, index)))}
      </tbody>
      </table>
    </div>
  )
}