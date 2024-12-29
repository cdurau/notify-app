import { useState } from "react"
import TodoItem from "./TodoItem"

function TodoList() {
    const itemsList = []

    const [items, setItems] = useState(itemsList)
    const [id, setId] = useState(1)

    const addTodo = e => {
        if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
            const todoTitle = e.target.parentElement.querySelector("input").value.trim()

            if (todoTitle !== "" && !items.some(item => item.title.toLowerCase() === todoTitle.toLowerCase())) {
                const todo = {
                    id: id,
                    title: todoTitle,
                    completed: false
                }

                setId(id + 1)

                setItems([todo, ...items])

                e.target.parentElement.querySelector("input").value = ""
            }
        }
    }

    const setTodoCompleted = id => {
        const newItems = items.map(item => {
            if (item.id === id) {
                item.completed = !item.completed
            }

            return item
        })

        const sortedNewItems = newItems.sort((a, b) => {
            if (a.completed && !b.completed) {
                return 1
            } else if (!a.completed && b.completed) {
                return -1
            } else if (a.completed && b.completed) {
                return a.title.localeCompare(b.title, undefined, { numeric: true })
            } else {
                return 0
            }
        })

        setItems(sortedNewItems)
    }

    const removeTodo = id => {
        const newItems = items.filter(item => item.id !== id)

        setItems(newItems)
    }

    const sortTodoList = () => {
        const newItems = items.sort((a, b) => {
            if (a.completed && !b.completed) {
                return 1
            } else if (!a.completed && b.completed) {
                return -1
            } else {
                return a.title.localeCompare(b.title, undefined, { numeric: true })
            }
        })

        setItems([...newItems])
    }

    return (
        <>
            <div style={newTodoStyle}>
                <input type="text" placeholder="Neues Todo ..." onKeyDown={addTodo} />
                <button onClick={addTodo}>Add</button>
                <button onClick={sortTodoList}>Sort</button>
            </div>
            <ul>
                {items.map(item => (
                    <TodoItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        setCompleted={setTodoCompleted}
                        removeTodo={removeTodo}
                    />
                ))}
            </ul>
        </>
    )
}

const newTodoStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0.5rem 1rem 1.5rem",
    borderBottom: "1px solid #ccc"
}

export default TodoList
