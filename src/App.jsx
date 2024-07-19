import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';

// this uuid provide a unique id to a todos

const App = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)


  useEffect(() => {
    let todostring = localStorage.getItem("todos")
  if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
    
  }, [])
  
    // save all todos to a local storage
  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }


  const togglefinished = (e) => {
    setFinished(!finished)
  }
  
   const handelChange = (e) =>{
    setTodo(e.target.value)

  }

  //this function allow to add a new to-do

  const handelAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo , isCompleted: false}])
    setTodo("")
    console.log(todos)

    savetols()
  }

  //check a to-do are completed or not 

  const handelCheckbox = (e) => {
   let id = e.target.name;
   let index = todos.findIndex(item=>{
    return item.id === id;
   })
   let newTodos = [...todos]
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)

   savetols()
  }

   //this function allow to edit a  to-do

  const handelEdit = (e, id)=>{
    let t = todos.filter(item=>item.id === id)  
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)

    savetols()
  }
  
  //this function allow to delete a  to-do

  const handelDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)

    savetols()
  }
  


  return (
    <div> <>
    <Navbar/>
    <div className="container mx-auto p-5 bg-violet-100 my-5 rounded-xl min-h-[80vh]">
      <div className="AddTodo">
        <h2 className='text-2xl font-bold m-5'>Add a todo</h2>

        <input onChange={handelChange} value={todo} type="text " className='w-1/2' />
        <button onClick={handelAdd} disabled={todo.length<=3} className='bg-violet-700 hover:bg-violet-950 text-white p-3 py-1 rounded-2xl mx-6'>Add</button>
      </div>
      <input onChange={togglefinished} type="checkbox" checked={finished} /> 
      <label className='mx-2' htmlFor="Show">Show Finished</label>
      <div className='h-[1px] bg-black opacity-15 my-5'></div>

        <h2 className='font-bold text-2xl m-5'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='font-bold m-5'>No Todos To Display </div>}
          {todos.map(item=>{
            return (finished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-1/2 my-3">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handelCheckbox} type="checkbox" checked={item.isCompleted} />

            <div className={item.isCompleted? "line-through": ""} >{item.todo}</div>
            </div>

            <div className="buttons flex h-full">
              
              <button onClick={(e)=>handelEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-950 text-white p-3 py-1 rounded-md mx-6'>Edit</button>
              <button onClick={(e)=>{handelDelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-950 text-white p-3 py-1 rounded-md mx-6'>Delete</button>
            </div>
          </div>
           })}
        </div>
     
      
   </div>
    </></div>
  )
}

export default App


