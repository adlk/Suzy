import { fetch } from './lib/fetch';

interface IResponse {
  status: number;
}

export async function markAsRead(id: number): Promise<IResponse | null> {
  try {
    const data: IResponse = await fetch(`https://api.github.com/notifications/threads/${id}`, {
      method: 'PATCH',
    });

    let status = 200;
    if (data.status !== 205) {
      status = data.status;
    }

    const response: IResponse = {
      status,
    };

    return response;
  } catch (err) {
    return err;
  }

  return null;
}
