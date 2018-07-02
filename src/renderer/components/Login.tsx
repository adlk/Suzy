import 'common/lib/FontAwesome';
import * as React from 'React';
import { Image } from './ui/Image';

interface IProps {
  openLoginWindow: () => void;
}

export class Login extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <main className="loginContainer">
          <Image src="logo.png" className="logo" />
          Bleep. Bloop. I'm Suzy.
          <button onClick={() => this.props.openLoginWindow()}>Login to Github</button>
        </main>
      </React.Fragment>
    );
  }
}
