import "./App.css";
import abi from "./contracts/TodoList.json";
import { useState, useEffect } from "react";
const { ethers } = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x28373210c790523023fe7144991FAa1Ed06EAd5C";
      const contractABI = abi.abi;
      try {
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
    console.log(state);
  }, []);

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const getAlltodos = async () => {
      const { contract } = state;
      if (contract) {
        const result = await contract.getAllTasks();
        console.log(result);
        setTodos(result);
      }
    };
    getAlltodos();
  }, [state]);

  const addTodo = async () => {
    const { contract } = state;
    if (contract) {
      const result = await contract.createTask(task);
      console.log(result);
    }
  };

  const removeTodo = async (index) => {
    const { contract } = state;
    if (contract) {
      const result = await contract.toggleCompleted(index);
      console.log(result);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.content}
            <span>Completed: {todo.completed ? `True` : `False`}</span>
            {"  "}
            <button onClick={() => removeTodo(index)}>Done?</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
