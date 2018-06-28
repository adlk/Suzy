export interface IRepository {
  fullName: string;
  name: string;
  url: string;
}

export interface IRepositoryOwner {
  avatarUrl: string;
  url: string;
  name: string;
}

export interface IUser {
  avatarUrl: string;
  url: string;
  name: string;
  association: string;
}

export interface INotification {
  id: number;
  number: number;
  title: string;
  type: string;
  reason: string;
  url: string;
  body?: string;
  unread: boolean;
  updatedAt: string;
  state?: string;
  closed?: boolean;
  merged?: boolean;
  repository: IRepository;
  owner: IRepositoryOwner;
  user: IUser;
}
