"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mysql_1 = __importDefault(require("mysql"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
if (JWT_SECRET === undefined) {
    throw new Error("Missing JWT_SECRET from .env file");
}
// Dependencies
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ########## START DATABASE ########## //
const db = mysql_1.default.createConnection({
    host: "database-1.cxackak4i601.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "IlRDS.bc09_",
    database: "tuesday",
    multipleStatements: true,
});
db.connect((err) => {
    if (err) {
        console.log("Failed to connect");
        throw err;
    }
    else {
        console.log("Connected to db! :)");
    }
});
// ########## END DATABASE ########## //
// ########## START MIDDLEWARE ########## //
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
// ########## END MIDDLEWARE ########## //
// ########## START AUTHENTICATION ########## //
// SIGNUP
app.post("/users", (req, res) => {
    const { displayName, email, password } = req.body;
    db.query("SELECT * FROM USERS WHERE EmailAddress = ?", [email], (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.sendStatus(400); // user already exists
            return;
        }
        const query = "INSERT INTO USERS SET ?";
        const userId = (0, crypto_1.randomInt)(9999);
        const token = jsonwebtoken_1.default.sign({ userId, email, displayName }, JWT_SECRET, {
            expiresIn: "4h",
        });
        const hashedPassword = bcrypt_1.default.hashSync(password, 5);
        const user = {
            UserID: userId,
            DisplayName: displayName,
            AuthToken: token,
            EmailAddress: email,
            Password: hashedPassword,
        };
        db.query(query, user, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(token);
            }
        });
    });
});
// LOGIN
app.put("/users", (req, res) => {
    // get user based on email
    db.query("SELECT * FROM USERS WHERE EmailAddress = ?", [req.body.email], (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length === 0) {
            res.sendStatus(403); // user not found
            return;
        }
        else {
            let validLogin = bcrypt_1.default.compareSync(req.body.password, result[0].Password);
            if (!validLogin) {
                res.status(403);
                res.send("Invalid email or password");
            }
            const token = jsonwebtoken_1.default.sign({
                userId: result[0].UserID,
                email: result[0].EmailAddress,
                displayName: result[0].DisplayName,
            }, JWT_SECRET, {
                expiresIn: "4h",
            });
            const query = "UPDATE USERS SET AuthToken = ? WHERE EmailAddress = ?";
            db.query(query, [token, req.body.email], (err, response) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(token);
                }
            });
        }
    });
});
// ########## END AUTHENTICATION ########## //
// ########## START PROJECT ########## //
app.get("/project", authenticateToken, (req, res) => {
    var _a;
    db.query("SELECT * FROM PROJECT WHERE UserId = ?", [(_a = req.user) === null || _a === void 0 ? void 0 : _a.userId], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.post("/project", authenticateToken, (req, res) => {
    var _a;
    const project = {
        ProjectName: req.body.ProjectName,
        UserID: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        ProjectPriority: req.body.ProjectPriority,
    };
    db.query("INSERT INTO PROJECT SET ?", project, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.put("/project/:id", authenticateToken, (req, res) => {
    const project = {
        ProjectName: req.body.ProjectName,
        ProjectPriority: req.body.ProjectPriority,
    };
    db.query("UPDATE PROJECT SET ? WHERE ProjectID = ?", [project, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.delete("/project/:id", authenticateToken, (req, res) => {
    db.query("DELETE FROM PROJECT WHERE ProjectID = ?", [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
// ########## END PROJECT ########## //
// ########## START BOARD ########## //
app.get("/project/:id/board", authenticateToken, (req, res) => {
    db.query("SELECT * FROM BOARD WHERE ProjectID = ?", [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.post("/board", authenticateToken, (req, res) => {
    const board = req.body;
    db.query("INSERT INTO BOARD SET ?", board, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.put("/board/:id", authenticateToken, (req, res) => {
    const board = req.body;
    db.query("UPDATE BOARD SET ? WHERE BoardID = ?", [board, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.delete("/board/:id", authenticateToken, (req, res) => {
    db.query("DELETE FROM BOARD WHERE BoardID = ?", [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
// ########## END BOARD ########## //
// ########## START TASK ########## //
app.get("/board/:id/task", authenticateToken, (req, res) => {
    const query = "SELECT * FROM TASK WHERE BoardID = ? ORDER BY Status, TaskPriority Desc";
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.post("/task", authenticateToken, (req, res) => {
    const task = req.body;
    db.query("INSERT INTO TASK SET ?", task, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.put("/tasks", authenticateToken, (req, res) => {
    const tasks = req.body;
    let query = "";
    let params = [];
    for (let status = 0; status < tasks.length; status++) {
        for (let i = 0; i < tasks[status].length; i++) {
            tasks[status][i].Status = status;
            // tasks[status][i].Order = i;
            query += "UPDATE TASK SET ? WHERE TaskID = ?;";
            params.push(tasks[status][i], tasks[status][i].TaskID);
        }
    }
    db.query(query, params, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(tasks);
        }
    });
});
app.put("/task/:id", authenticateToken, (req, res) => {
    const task = req.body;
    db.query("UPDATE TASK SET ? WHERE TaskID = ?", [task, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
app.delete("/task/:id", authenticateToken, (req, res) => {
    db.query("DELETE FROM TASK WHERE TaskID = ?", [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});
// ########## END TASK ########## //
// ########## START NOTE ########## //
// ########## END NOTE ########## //
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
const listener = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running` + listener.address() + `:${port}`);
});
