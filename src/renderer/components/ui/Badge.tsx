import * as classNames from 'classnames';
import * as React from 'react';

interface IProps {
  type?: 'default' | 'success' | 'danger';
  className?: string;
}

export class Badge extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    type: 'default',
  };

  public render() {
    return (
      <span className={classNames({
        badge: true,
        [`${this.props.type}`]: this.props.type,
        [`${this.props.className}`]: this.props.className,
      })}
      >
        {this.props.children}
      </span>
    );
  }
}
