import path from 'path';
import * as React from 'React';

interface IProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
}

export class Image extends React.Component<IProps> {
  public render() {
    // work around electron-webpack __static path issue
    const staticPath = process.env.NODE_ENV === 'production' ? path.join(process.resourcesPath || '', 'static') : __static;
    const src = path.join('file://', staticPath, 'images', this.props.src);

    return (
      <img {...this.props} src={src} />
    );
  }
}
