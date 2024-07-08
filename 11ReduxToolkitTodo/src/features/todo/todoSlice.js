import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{id: 1, text: "Hello world", status:false }]
}

 

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload,
                status:false
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        },
        updateTodo:(state,action)=>{
            const update=state.todos.find((todo)=>(todo.id===action.payload.id))
            if(update){
                update.text=action.payload.text;
            }
        },
        changestatus:(state,action)=>{
            const cs=state.todos.find((todo)=>(todo.id===action.payload.id))
            if(cs){
               cs.status=action.payload.status;
            }
        }
    }
})

export const {addTodo, removeTodo,updateTodo,changestatus} = todoSlice.actions

export default todoSlice.reducer