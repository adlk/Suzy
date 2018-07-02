import path from 'path';
import * as React from 'React';

interface IProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
}

export class Image extends React.Component<IProps> {
  public render() {

    const src = path.join('file://', __static, 'images', this.props.src);

    return (
      <img {...this.props} src={src} />
    );
  }
}
