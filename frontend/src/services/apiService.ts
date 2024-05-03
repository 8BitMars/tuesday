import axios from "axios";
import { getCookie } from "../hooks/auth/useAuth";
import { Task, FormatedTask, Project, Board } from "../data/types";
axios.defaults.baseURL = "http://localhost:6868";

axios.interceptors.request.use((config) => {
  const token = getCookie("tuesday");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

const formatDate = (date: Date) => {
  let isoString = new Date(date).toISOString().split("T");
  let d = isoString[0];
  let t = isoString[1].substring(0, 8);

  return d + " " + t;
};

const formatTask = (task: Task): FormatedTask => {
  return Object.assign({}, task, {
    DateCreated: formatDate(task.DateCreated),
    DueDate: task.DueDate ? formatDate(task.DueDate) : undefined,
  });
};

export const api = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.put("/users", { email, password });
    return res.data;
  },
  signUp: async (user: {
    email: string;
    displayName: string;
    password: string;
  }) => {
    const res = await axios.post("/users", user);
    return res.data;
  },
  getProjects: async () => {
    const res = await axios.get("/project");
    return res.data as Project[];
  },
  createProject: async (project: {
    ProjectName: string;
    ProjectPriority: number;
  }) => {
    const res = await axios.post("/project", project);
    return res.data;
  },
  editProject: async (project: {
    ProjectID: number;
    ProjectName: string;
    ProjectPriority: number;
  }) => {
    const res = await axios.put(`/project/${project.ProjectID}`, project);
    return res.data;
  },
  deleteProject: async (ProjectID: number) => {
    const res = await axios.delete("/project/" + ProjectID);
    return res.data;
  },
  getBoards: async (ProjectID: number) => {
    if (ProjectID === 0) return [];
    const res = await axios.get(`/project/${ProjectID}/board`);
    return res.data as Board[];
  },
  createBoard: async (board: {
    BoardName: string;
    BoardPriority: number;
    ProjectID: number;
  }) => {
    const res = await axios.post("/board", board);
    return res.data;
  },
  editBoard: async (board: {
    BoardID: number;
    BoardName: string;
    BoardPriority: number;
  }) => {
    const res = await axios.put(`/board/${board.BoardID}`, board);
    return res.data;
  },
  deleteBoard: async (BoardID: number) => {
    const res = await axios.delete("/board/" + BoardID);
    return res.data;
  },
  getTasks: async (BoardID: number) => {
    if (BoardID === 0) return [];
    const res = await axios.get(`/board/${BoardID}/task`);
    const taskList = res.data as Task[];
    const todos = taskList.filter((task) => task.Status === 0);
    const doing = taskList.filter((task) => task.Status === 1);
    const done = taskList.filter((task) => task.Status === 2);
    return [todos, doing, done];
  },
  createTask: async (task: {
    Title: string;
    TaskDescription: string;
    DateCreated: Date;
    BoardID: number;
    TaskPriority: number;
    Status: number;
  }) => {
    const formatedTask = {
      Title: task.Title,
      TaskDescription: task.TaskDescription,
      DateCreated: formatDate(task.DateCreated),
      BoardID: task.BoardID,
      TaskPriority: task.TaskPriority,
      Status: task.Status,
    };
    const res = await axios.post("/task", formatedTask);
    return res.data;
  },
  editTasks: async (tasks: Task[][]) => {
    let t: FormatedTask[][] = [...tasks].map((taskGroup) =>
      taskGroup.map((task) => formatTask(task))
    );
    const res = await axios.put("/tasks", t);
    const taskList = res.data as Task[];
    const todos = taskList.filter((task) => task.Status === 0);
    const doing = taskList.filter((task) => task.Status === 1);
    const done = taskList.filter((task) => task.Status === 2);
    return [todos, doing, done];
  },
  editTask: async (task: Task) => {
    const formatedTask = formatTask(task);
    const res = await axios.put(`/task/${formatedTask.TaskID}`, formatedTask);
    return res.data;
  },
  deleteTask: async (TaskID: number) => {
    const res = await axios.delete("/task/" + TaskID);
    return res.data;
  },
};
