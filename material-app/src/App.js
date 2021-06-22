import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("page=1");
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);


  const page = [
    {
      id: "page1",
      value: "page=1",
    },
    {
      id: "page2",
      value: "page=2",
    },
  ];

  useEffect(() => {
    fetch(`https://reqres.in/api/users?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        console.log(data.data[2].first_name);
      });
  }, [query]);
 
  useEffect(() => {
   console.log('value',list)
  }, [list])

  const handleSubmit=(e)=>{
    e.preventDefault()
    setList([value])
    console.log('list',e.target.value)
    
  }
  return (
    <div className="App">
      <div>
        {page.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setQuery(item.value);
              }}
            >
              {item.id}
            </button>
          );
        })}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.avatar} />
                  </td>
                  <td>{item.first_name + " " + item.last_name}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <form >
          <input placeholder={'Enter Todo Item'} 
          value={value} onChange={(e)=>{setValue(e.target.value)}}/>
          <button onClick={(e)=>{handleSubmit(e)}}>Add Item</button>
          
        </form>
        {list && list.map((item,index)=>{
          return <h4 key={index}>{item}</h4>

        })}
      </div>
    </div>
  );
}

export default App;
