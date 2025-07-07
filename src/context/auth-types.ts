export interface UserSession {
  accessToken: string;
  refreshToken: string;
  userId: string;
  fullName: string;
  imageUser: string;
  email: string;
  organismoId: number;
  organismoFullName: string;
  organismoAbreviacion: string;
  modules: Module[];
  roles: Role[];
  permissions: string[];
  userName: string;
}

export interface Module {
  name: string;
  path: string;
  icon: string;
  order: number;
  children: Module[];
}

export interface Role {
  name: string;
  description?: string;
}
