import { transform } from 'common/helpers/github';
import { IGithubIssue, IGithubIssueComment, IGithubNotification, IGithubPullRequest } from 'common/types/githubApi';
import { INotification } from 'common/types/notification';
import { fetch } from './lib/fetch';

interface INotificationsResponse {
  status: number;
  data: INotification[];
}

interface IGenericResponse {
  status: number;
}

export async function getNotifications({ all = true, participating = true }: { all?: boolean, participating?: boolean } = {}): Promise<INotificationsResponse | null> {
  try {
    const rawData: IGithubNotification[] = await fetch(`https://api.github.com/notifications?all=${all}&participating=${participating}`);

    if (rawData.length > 0) {
      // const notifications = [];
      const notifications = await Promise.all(rawData.map(async (d) => {
        let data: INotification = {
          number: 0,
          url: '',
          id: d.id,
          title: d.subject.title,
          type: d.subject.type.toLowerCase(),
          reason: d.reason,
          unread: d.unread,
          updatedAt: d.updated_at,
          repository: {
            name: d.repository.name,
            fullName: d.repository.full_name,
            url: d.repository.url,
          },
          owner: {
            avatarUrl: d.repository.owner.avatar_url,
            url: d.repository.owner.html_url,
            name: d.repository.owner.login,
          },
          user: {
            name: '',
            url: '',
            association: '',
            avatarUrl: '',
          },
        };

        // let details: IGithubIssue | IGithubIssueComment | IGithubPullRequest;

        if (d.subject.type === 'Issue') {
          const issueDetails: IGithubIssue = await fetch(d.subject.url);

          let commentDetails: IGithubIssueComment | undefined;
          if (d.subject.latest_comment_url) {
            console.log(d.subject.title, d.subject.latest_comment_url);
            commentDetails = await fetch(d.subject.latest_comment_url);
          }

          const details: IGithubIssue | IGithubIssueComment = commentDetails ? commentDetails : issueDetails;

          data = Object.assign(data, {
            number: issueDetails.number,
            url: details.html_url,
            body: details.body,
            state: issueDetails.state,
            closed: issueDetails.state === 'closed',
            user: {
              name: details.user.login,
              url: details.user.html_url,
              association: details.author_association,
              avatarUrl: details.user.avatar_url,
            },
          });
        }

        if (d.subject.type === 'PullRequest') {
          const details: IGithubPullRequest = await fetch(d.subject.url);

          data = Object.assign(data, {
            number: details.number,
            url: details.html_url,
            body: details.body,
            state: details.state,
            closed: details.state === 'closed',
            merged: details.merged,
            user: {
              name: details.user.login,
              url: details.user.html_url,
              association: details.author_association,
              avatarUrl: details.user.avatar_url,
            },
          });
        }

        return transform(data);
      }));

      const response: INotificationsResponse = {
        status: 200,
        data: notifications,
      };

      return response;
    }
  } catch (err) {
    console.debug(err);
  }

  return null;
}

export async function markAsRead(id: number): Promise<IGenericResponse | null> {
  try {
    const data: IGenericResponse = await fetch(`https://api.github.com/notifications/threads/${id}`, {
      method: 'PATCH',
    });

    let status = 200;
    if (data.status !== 205) {
      status = data.status;
    }

    const response: IGenericResponse = {
      status,
    };

    return response;
  } catch (err) {
    return err;
  }

  return null;
}

export async function unsubscribe(id: number): Promise<IGenericResponse | null> {
  try {
    const data: IGenericResponse = await fetch(`https://api.github.com/notifications/threads/${id}/subscription`, {
      method: 'DELETE',
    });

    let status = 200;
    if (data.status !== 204) {
      status = data.status;
    }

    const response: IGenericResponse = {
      status,
    };

    return response;
  } catch (err) {
    return err;
  }

  return null;
}
