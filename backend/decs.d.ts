type User = {
  userId: number;
  email: string;
  displayName: string;
  iat?: number;
  exp?: number;
};

declare namespace Express {
  interface Request {
    user?: User;
  }
}
