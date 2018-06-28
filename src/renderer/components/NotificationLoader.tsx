import * as React from 'react';

interface IState {
  currentEmoji: number;
  interval: number | null;
}

export class NotificationLoader extends React.Component<{}, IState> {
  public state = {
    currentEmoji: 0,
    interval: null,
  };

  public emojis = [
    '{•̃ᵕ•̃}',
    '☜(⌒▽⌒)☞',
    'ヽ(´▽`)/',
    'ฅ^•ﻌ•^ฅ',
    '⊂(◉‿◉)つ',
    '“ヽ(´▽｀)ノ”',
    '( ˘ ³˘)♥',
    '◖ᵔᴥᵔ◗ ♪ ♫ ',
    '{•̃_•̃}',
    '(◠﹏◠)',
  ];

  public componentDidMount() {
    const interval = window.setInterval(() => {
      const next = this.state.currentEmoji + 1;
      this.setState({
        currentEmoji: next === this.emojis.length ? 0 : next,
      });
    }, 100);

    this.setState({
      interval,
    });
  }

  public componentWillUnmount() {
    if (!this.state.interval) { return; }

    clearInterval(this.state.interval!);
  }

  public render() {
    return (
      <article className="notificationsEmptyState">
        <p className="ascii_emoji">
          {this.emojis[this.state.currentEmoji]}
        </p>
        <p><strong>Loading...</strong></p>
      </article>
    );
  }
}
