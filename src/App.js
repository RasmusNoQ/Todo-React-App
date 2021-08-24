import React,{useState,useEffect} from "react";
import './App.css';
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
  //run once
  useEffect(() => {
    getLocalTodos();
  },[]);
  
  
  //States
  const [inputText, setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos, setFilteredTodsos] = useState([])

  //use Effect
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status]);


  //Functions
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodsos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodsos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodsos(todos);
        break;
    }
  };

  //save to Local
  const saveLocalTodos = () =>{
   
      localStorage.setItem("todos",JSON.stringify(todos));
    
  }

  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') === null){
      localStorage.setItem("todos",JSON.stringify([]));
    }else{
      let todoLocal= JSON.parse(localStorage.getItem("todos",JSON.stringify(todos)));
      setTodos(todoLocal);
      
    }
  }

  return (
    <div className="App">
    <header>
      <h1>Else Todo  List</h1> 
    </header>
    <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
    <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
