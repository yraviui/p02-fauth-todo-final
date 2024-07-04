import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { LuLogOut } from "react-icons/lu";
import Todo from "./Todo";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
    bgHeadSub: `flex justify-between bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `flex justify-between p-2`,
    userInfo: 'flex align-center',
    filterUl: 'flex align-center',
    filterli: 'ml-3 cursor-pointer',
}

const TodosApp = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [inputDes, setInputDes] = useState('')
    const navigate = useNavigate();
    const [user] = useAuth()
    const [search, setSearch] = useState('')

    // create todo
    const createTodo = async (e) => {
        e.preventDefault()
        if (input === '') {
            console.log('Please enter a valid todo')
            return
        }
        await addDoc(collection(db, 'todos'), {
            title: input, status: false, description: inputDes
        })
        setInput('')
        setInputDes('')
    }

    // read todo from firebase
    useEffect(() => {
        const q = query(collection(db, 'todos'))
        console.log('q: ', q)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            console.log('querySnapshot: ', querySnapshot)
            querySnapshot.forEach((doc) => {
                console.log('doc: ', doc)
                todosArr.push({ ...doc.data(), id: doc.id })
            });
            setTodos(todosArr);
        });
        return () => unsubscribe();
    }, [])
    console.log('todos: ', todos)
    console.log('input: ', input)

    // update todo in firebase
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            status: !todo.status
        })
    }
    // delete todo from firebase
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id))
    }
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message);
        }
    }


    return (
        <>
            <div className={style.bg}>
                <div className={style.container}>
                    <div className={style.bgHeadSub}>
                        <h3 className={style.heading}>Todo App</h3>
                        <div className={style.userInfo}>{user && user?.email}</div>
                        <button onClick={handleLogout} className='border-2 px-6 py-2 my-4'><LuLogOut /></button>
                    </div>
                    <form onSubmit={createTodo} className={style.form}>
                        <input value={input} onChange={e => setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo" />
                        <input value={inputDes} onChange={e => setInputDes(e.target.value)} className={style.input} type="text" placeholder="Add description" />
                        <button className={style.button}><AiOutlinePlus /></button>
                    </form>
                    <input value={search} onChange={e => setSearch(e.target.value)} className={style.input} type="text" placeholder="Search Todo" />
                    {/* <ul>
                        {todos.map((o, index) => <Todo key={index} todo={o} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />)}
                    </ul> */}
                    <ul>
                        {todos?.filter(o => o.title.toLowerCase().includes(search.toLowerCase()) && o.title !== search.toLowerCase())
                            .map((o, index) => <Todo key={index} todo={o} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />)}
                    </ul>
                    {todos.length < 1 ? '' :
                        <p className={style.count}>
                            <span>{`You have ${todos.length} todos`}</span>
                        </p>}
                </div>
            </div>
        </>
    );
}

export default TodosApp