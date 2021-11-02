import { ITodo } from '../types/data';
import styles from '../styles/TodoItem.module.css';

interface ITodoItem extends ITodo {
    toggleTodo: (id: number) => void,
    removeTodo: (id: number) => void,
}

const TodoItem: React.FC<ITodoItem> = (props) => {
    const {id, title, complete, removeTodo, toggleTodo} = props;

    return(
        <>
        <div className={complete ? styles.un__item : styles.item} onClick={() => toggleTodo(id)}>
            <span>{title}</span>
            <span className={styles.deleteElem} onClick={(e) => {e.stopPropagation();removeTodo(id)}}></span>
        </div>
        </>
    );
}

export default TodoItem;