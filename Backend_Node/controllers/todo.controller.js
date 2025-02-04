const pool = require('../connection')
const { v4: uuidv4 } = require('uuid')

/* ======================= Get all todos for a user =========================== */
async function getTodos(req, res) {
    const auth = req.headers.authorization
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim()
        const decoded = atob(encoded)
        const [username, password] = decoded.split(':')

        pool.getConnection((err, con) => {
            if (err) {
                res.status(500).json({ error: `Error connecting to the database: ${err}` })
                return
            }
            con.query(`Select * from todos where username = '${username}'`, (error, result) => {
                con.release();
                if (error) {
                    console.log(error)
                    res.status(500).json({ error: `Error fetching data from database` })
                    return
                }
                if (!result || result.length === 0) {
                    res.status(404).json({ message: 'No todos found' })
                    return
                }
                res.status(200).json(result)
            })

        })
    }
}

/* ============================== Add todo for a user ============================== */
async function addTodo(req, res) {
    const id = uuidv4()
    const task = req.body.task
    const status = "pending"

    const auth = req.headers.authorization
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim()
        const decoded = atob(encoded)
        const [username, password] = decoded.split(':')

        pool.getConnection((err, con) => {
            if (err) {
                res.status(500).json({ error: `Error connecting to the database: ${err}` })
                return
            }
            con.query(`Insert into todos values ("${id}", "${task}", "${username}", "${status}")`, (err, result) => {
                con.release();
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: `Error inserting data into database` })
                    return
                }
                if (result && result.affectedRows > 0) {
                    res.status(201).json({ message: "Todo created successfully" });
                } else {
                    res.status(500).json({ error: "Failed to insert todo" });
                }
            })

        })
    }
}

/* ================================ Edit todo for a user ============================== */
async function editTodo(req, res) {
    const id = req.body.id
    const task = req.body.task

    const auth = req.headers.authorization
    if (auth != null && auth.startsWith("Basic ")) {
        pool.getConnection((err, con) => {
            if (err) {
                res.status(500).json({ error: `Error connecting to the database: ${err}` })
                return
            }
            con.query(`Update todos set task = "${task}" where id = "${id}"`, (err, result) => {
                con.release()
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: `Error updating data into database` })
                    return
                }
                if (result && result.affectedRows > 0) {
                    res.status(200).json({ message: "Todo updated successfully" });
                } else {
                    res.status(404).json({ error: "No todos found for updation" });
                }
            })
        })
    }
}

/* ============================== Delete a todo for a user =============================== */
async function deleteTodo(req, res) {
    const id = req.params.id
    const auth = req.headers.authorization
    if (auth != null && auth.startsWith("Basic ")) {
        pool.getConnection((err, con) => {
            if (err) {
                res.status(500).json({ error: `Error connecting to the database: ${err}` })
                return
            }
            con.query(`Delete from todos where id = "${id}"`, (err, result) => {
                con.release()
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: `Error deleting data from database` })
                    return
                }
                if (result && result.affectedRows > 0) {
                    res.status(200).json({ message: "Todo deleted successfully" });
                } else {
                    res.status(404).json({ error: "Todo not found" });
                }
            })
        })
    }
}

/* ======================= Delete all completed todos for a user =========================== */
async function deleteAllCompletedTodos(req, res) {
    const auth = req.headers.authorization
    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim()
        const decoded = atob(encoded)
        const [username, password] = decoded.split(':')

        pool.getConnection((err, con) => {
            if (err) {
                res.status(500).json({ error: `Error connecting to the database: ${err}` })
                return
            }
            con.query(`Delete from todos where status = "completed" and username = "${username}"`, (err, result) => {
                con.release()
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: `Error deleting data from database` })
                    return
                }
                if (result && result.affectedRows > 0) {
                    res.status(200).json({ message: "Completed todos deleted successfully" });
                } else {
                    res.status(404).json({ error: "No completed todos found for deletion" });
                }
            })
        })
    }
}

/* ======================= Change status of a todo to complete =========================== */
async function changeStatus(req, res) {
    const id = req.body.id
    const status = req.body.status
    const auth = req.headers.authorization

    if (auth != null && auth.startsWith("Basic ")) {
        pool.getConnection((err, con) => {
            if (err) {
                res.status(500).json({ error: `Error connecting to the database: ${err}` })
                return
            }
            con.query(`Update todos set status = "${status}" where id = "${id}"`, (err, result) => {
                con.release()
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: `Error updating todo status in database` })
                    return
                }
                if (result && result.affectedRows > 0) {
                    res.status(200).json({ message: "Todo status updated successfully" });
                } else {
                    res.status(404).json({ error: "No todos found for updation" });
                }
            })
        })
    }
}


module.exports = { getTodos, addTodo, editTodo, deleteTodo, deleteAllCompletedTodos, changeStatus }