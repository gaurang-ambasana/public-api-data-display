import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const { data } = await axios.get(`https://randomuser.me/api/?results=20`);

  const { results } = data;

  return results;
};

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchData().then((res) => setPeople(res));
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Age</th>
            <th>DOB</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, id) => (
            <tr key={id}>
              <td>{++id}</td>
              <td>
                <img src={person.picture.thumbnail} alt="img" />
              </td>
              <td>{`${person.name.title}. ${person.name.first} ${person.name.last}`}</td>
              <td>{person.dob.age}</td>
              <td>{person.dob.date.toString().substr(0, 10)}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
