import * as React from 'react';

export class NotificationEmptyState extends React.Component {
  public render() {
    return (
      <article className="notificationsEmptyState">
        <p className="ascii_emoji">
          “ヽ{'{'}•̃▽•̃{'}'}ノ”
        </p>
        <p><strong>Status Code: 200 OK</strong></p>
        <p>There is nothing you need to worry about.</p>
      </article>
    );
  }
}
