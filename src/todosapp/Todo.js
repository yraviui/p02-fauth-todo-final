import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`,
    spanTitle: `mr-2 font-semibold text-[#b80344]`,
    span: `mr-2`,
    spanML2: `ml-2`
}

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
    console.log('todo: ', todo)
    return (
        <li className={todo.status ? style.liComplete : style.li}>
            <div className={style.row}>
                <input onChange={() => toggleComplete(todo)} type='checkbox' checked={todo.status ? 'checked' : ''} />
                <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>
                    <span className={style.spanTitle}>{todo.title}: </span>
                    <span className={style.span}>{todo.description}</span>
                </p>
            </div>
            {todo.status ?
                <button className={style.button} onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt /> <span className={style.spanML2}>Done</span></button>
                :
                <button className={style.button} onClick={() => alert('Please select checkbox')}><FaRegTrashAlt /></button>
            }
        </li>
    )
}

export default Todo