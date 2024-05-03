export interface Project {
  ProjectID: number;
  ProjectName: string;
  ProjectPriority: number;
  UserID: number;
}

export interface Board {
  BoardID: number;
  BoardName: string;
  BoardPriority: number;
  ProjectID: number;
}

export interface Task {
  TaskID: number;
  Title: string;
  TaskDescription: string;
  DueDate: Date | undefined;
  DateCreated: Date;
  BoardID: number;
  TaskPriority: number;
  Status: number;
}
export interface FormatedTask {
  TaskID: number;
  Title: string;
  TaskDescription: string;
  DueDate: string | undefined;
  DateCreated: string;
  BoardID: number;
  TaskPriority: number;
  Status: number;
}

export interface Note {
  NoteID: number;
  TaskID: number;
  DatePosted: Date;
  NoteDescription: string;
}

export interface FormatedNote {
  NoteID: number;
  TaskID: number;
  DatePosted: string;
  NoteDescription: string;
}
