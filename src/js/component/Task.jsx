import React, { useEffect, useState } from "react";

export const Task = () => {

    const [ToNewTask, setToNewTask] = useState('');
    const [listTask, setListTask] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [toEditTask, setToEditTask] = useState({id: null, label: '', is_done: false});

    const base_url = 'https://playground.4geeks.com/todo'

    const getAllPostUser = async () => {

        const response = await fetch(`${base_url}/users/fran`,
            {
                method: 'GET'
            })

        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        }

        const data = await response.json()

        setListTask(data.todos)

    }

    const deletePost = async (idTask) => {

        const response = await fetch(`${base_url}/todos/${idTask}`,
            {
                method: 'DELETE'
            })

        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        }

        setListTask((previousTasks) => previousTasks.filter(task => task.id !== idTask));
    }

    const formEdit = (task) => {
        setToEditTask(task)
        setIsEdit(true)        
    }

    const cancelEdit = () => {
        setIsEdit(false); // Cambiar a formulario de "Añadir"
        setToEditTask({
            id: null,
            label: '',
            is_done: false
        }); 
    };

    const editTask = async (task) => {

        const response = await fetch(`${base_url}/todos/${task.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    label: task.label,
                    is_done: task.is_done,
                }),
            });

        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return;
        }

        const data = response.json()
        setListTask((previousTask) => previousTask.map(t => (t.id === task.id ? data : t)))

        setIsEdit(false)

    }

    const addTask = async (event) => {

        // event.preventDefault();

        if (ToNewTask.trim() === "") return;

        const response = await fetch(`${base_url}/todos/fran`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    label: ToNewTask,
                    is_done: false
                })
            }
        )

        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return;
        }

        // const data = await response.json(); 
        // setListTask([...listTask, data]);
        // setToNewTask("");
        getAllPostUser()
    }

    useEffect(() => {
        getAllPostUser()
    }, [listTask])

    return (
        <div className="mt-5">

            {
                isEdit == false ?

                    <form onSubmit={addTask} className="w-50 mx-auto" style={{ border: '2px dotted black', borderRadius: '10px', padding: '10px' }}>
                        <label htmlFor="addList" className="form-label">Add task</label>
                        <input type="text" className="form-control" id="addList" value={ToNewTask} onChange={(e) => setToNewTask(e.target.value)} placeholder="Add your task" />
                    </form>

                    :

                    <form className="w-50 mx-auto" style={{ border: '2px dotted black', borderRadius: '10px', padding: '10px' }}>
                        <label htmlFor="editList" className="form-label">Edit task</label>
                        <input type="text" className="form-control" id="editList" onChange={(e) => setToEditTask({ ...toEditTask, label: e.target.value })} value={toEditTask.label || ""} />

                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" onChange={() => setToEditTask({ ...toEditTask, is_done: !toEditTask.is_done })} checked={toEditTask.is_done || false} id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Completed
                            </label>
                        </div>

                        <div className="mt-3">
                            <button type="button" onClick={() =>{editTask(toEditTask); cancelEdit();}} className="btn btn-primary me-2">Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                        </div>
                    </form>
            }


            {
                listTask.length == 0 ?

                    <h4 className="mt-5 text-muted">The list is empty. Add a task</h4>

                    :

                    <ul className="list-group mt-3" id="list">

                        {listTask.map((iterator) => (
                            <li className="list-group-item item-list" key={iterator.id}>

                                {iterator.is_done == false ?

                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="green" className="bi bi-hand-thumbs-up-fill me-3" viewBox="0 0 16 16">
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                    </svg>

                                    :

                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="red" className="bi bi-ban me-3" viewBox="0 0 16 16">
                                        <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                                    </svg>

                                }

                                {iterator.label}

                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => formEdit(iterator)} width="25" height="25" fill="blue" className="bi bi-pencil-square icon2" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => deletePost(iterator.id)} width="25" height="25" fill="red" className="bi bi-trash icon" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>

                            </li>
                        ))}

                    </ul>
            }
        </div>
    )
}