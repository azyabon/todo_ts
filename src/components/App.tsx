import { useState, useRef, useEffect } from 'react';

import TodoList from './TodoList';
import { ITodo } from '../types/data';
import styles from '../styles/App.module.css';

const App: React.FC = () => {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState<ITodo[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setValue(e.target.value)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e): void => {
        if (e.key === "Enter") addTodo();
    }

    const addTodo = (): void => {
        if (value) {
            setTodos([...todos, {
                id: Date.now(),
                title: value,
                complete: false,
            }])
            setValue("");
        }
    }

    const removeTodo = (id: number): void => {
        setTodos(todos.filter(todos => todos.id !== id));
    }

    const toggleTodo = (id: number): void => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;
            
            return {
                ...todo,
                complete: !todo.complete
            }
        }))
    }

    const clearAll = (): void => {
        setTodos([]);
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>TODOLIST</h1>
            <input className={styles.input} value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef} placeholder="What needs to be done?" />
            <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
            <div className={styles.info}>
                <span className={styles.total}>{`Total: ${todos.length}`}</span>
                <span>{`Complete: ${todos.filter(todo => todo.complete).length}`}</span>
                <span onClick={clearAll}>ClearAll</span>
            </div>
        </div>
    );
}

export default App;