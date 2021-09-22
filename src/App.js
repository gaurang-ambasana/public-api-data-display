import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const fetchData = async () => {
  const { data } = await axios.get(`https://randomuser.me/api/?results=20`);

  const { results } = data;

  return results;
};

const searchPeople = (data, searchString) =>
  data.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(searchString)
  );

const App = () => {
  const [people, setPeople] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData().then((res) => setPeople(res));
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Random User Data</title>
        <meta
          name="description"
          content="Random User Data with live search bar"
        />
      </Helmet>
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        placeholder="Search here - Live Search"
        autoComplete="off"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Age</th>
            <th>DOB</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Postal Code</th>
          </tr>
        </thead>
        <tbody>
          {people &&
            searchPeople(people, searchText).map((person, id) => (
              <tr key={id}>
                <td>{++id}</td>
                <td>
                  <img src={person.picture.thumbnail} alt="img" />
                </td>
                <td>{`${person.name.title}. ${person.name.first} ${person.name.last}`}</td>
                <td>{person.dob.age}</td>
                <td>{person.dob.date.toString().substr(0, 10)}</td>
                <td>{person.email}</td>
                <td>{person.location.city}</td>
                <td>{person.location.state}</td>
                <td>{person.location.country}</td>
                <td>{person.location.postcode}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
