import { getUser } from 'common/api';
import { Request } from 'common/lib/Request';
import { IUser } from 'common/types/user';
import { computed } from 'mobx';
import { Store } from 'common/lib/Store';

interface IUserRequestResponse {
  status: number;
  data: IUser;
}

export class UserStore extends Store {
  public userRequest = new Request(getUser);

  @computed get user(): IUser | null {
    const res: IUserRequestResponse = this.userRequest.execute().result;

    if (res && res.data) {
      return res.data;
    }

    return null;
  }
}
