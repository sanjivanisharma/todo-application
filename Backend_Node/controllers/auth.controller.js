const pool = require('../connection')

/* =============================== Login ===================================== */
async function login(req, res) {
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
            con.query(`Select * from user where username = "${username}"`, (err, result) => {
                con.release();
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: `Error fetching data from database` })
                    return
                }
                if (!result || result.length === 0) {
                    res.status(404).json({ message: "No user found" });
                    return;
                } else {
                    if (result[0]['password'] === password) {
                        res.status(200).json(result[0])
                        console.log(result[0]['username'] + " logged in")
                        return
                    } else {
                        res.status(401).json({ error: "Incorrect password" })
                        console.log("Incorrect password")
                        return
                    }
                }
            })
        })
    }
}

/* =============================== Signup ===================================== */
async function signup(req, res) {
    const auth = req.headers.authorization
    const email = req.body.email

    if (auth != null && auth.startsWith("Basic ")) {
        const encoded = auth.substring("Basic ".length).trim()
        const decoded = atob(encoded)
        const [username, password] = decoded.split(':')

        pool.getConnection((err, con) => {
            if (err) {
                res.status(500).json({ error: `Error connecting to the database: ${err}` })
                return
            }
            con.query(`Select * from user where username = "${username}"`, (err, result1) => {
                if (err) {
                    con.release();
                    console.log(err)
                    res.status(500).json({ error: `Error fetching data from database` })
                    return
                }
                if (result1.length > 0) {
                    con.release();
                    res.status(409).json({ message: "User already exists" })
                    console.log("User already exists")
                    return
                } else {
                    con.query(`Select * from user where email = "${email}"`, (err, result2) => {
                        if (err) {
                            con.release();
                            console.log(err)
                            res.status(500).json({ error: `Error fetching data from database` })
                            return
                        }
                        if (result2.length > 0) {
                            con.release();
                            res.status(409).json({ message: "User with the provided email already exists" })
                            console.log("User with the provided email already exists")
                            return
                        } else {
                            con.query(`Insert into user values ("${username}", "${email}", "${password}")`, (err, result) => {
                                con.release();
                                if (err) {
                                    console.log(err)
                                    res.status(500).json({ error: `Error inserting data in database` })
                                    return
                                }
                                if (result && result.affectedRows > 0) {
                                    res.status(200).json({ message: "User Created successfully" });
                                } else {
                                    res.status(404).json({ error: "Failed to create user" });
                                }
                            })
                        }
                    })
                }
            })
        })
    }
}

module.exports = { login, signup }