import { IGithubUser } from 'common/types/githubApi';
import { IUser } from 'common/types/user';
import { fetch } from './lib/fetch';

interface IResponse {
  status: number;
  data: IUser;
}

export async function getUser({ all = true, participating = true }: { all?: boolean, participating?: boolean } = {}): Promise<IResponse | null> {
  try {
    const data: IGithubUser = await fetch('https://api.github.com/user');

    const user: IUser = {
      id: data.id,
      avatarUrl: data.avatar_url,
      login: data.login,
      url: data.html_url,
    };

    const response: IResponse = {
      status: 200,
      data: user,
    };

    return response;
  } catch (err) {
    console.debug(err);
  }

  return null;
}
