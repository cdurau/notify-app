import PropTypes from "prop-types"
import "./TodoItem.css"

const TodoItem = ({ id, title, setCompleted, removeTodo }) => {
    const completeItem = e => {
        e.target.parentElement.classList.toggle("completed")
        setCompleted(id)
    }

    const removeItem = () => {
        removeTodo(id)
    }

    return (
        <li className="todo-item">
            <input type="checkbox" name="complete-todo" onClick={completeItem} /> <p>{title}</p>
            <button className="btn-remove" onClick={removeItem}>
                x
            </button>
        </li>
    )
}

TodoItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    setCompleted: PropTypes.func,
    removeTodo: PropTypes.func
}

export default TodoItem
