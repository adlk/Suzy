import {
  findIconDefinition,
  IconDefinition,
  IconLookup,
  IconName,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface IProps {
  icon: string;
  className?: string;
}

export class Icon extends React.Component<IProps> {
  public static defaultProps = {
    className: '',
  };

  public render() {

    const iconLookup: IconLookup = { prefix: 'far', iconName: this.props.icon as IconName };
    const iconDefinition: IconDefinition = findIconDefinition(iconLookup);
    return (
      <FontAwesomeIcon
        icon={iconDefinition}
        className={this.props.className}
      />
    );
  }
}
