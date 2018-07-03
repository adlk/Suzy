import * as React from 'React';
import { Link } from 'react-router-dom';
import { Icon } from './ui/Icon';

const isMac = process.platform === 'darwin';
const ctrlKey = isMac ? '⌘' : 'Ctrl';

export class Help extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <header className="header">
          <Link to="/" className="header__action--left">
            <Icon icon="arrow-left" /> back
          </Link>
          Help
        </header>
        <main className="help">
          <div className="content">
            <h2>Shortcuts</h2>
            <table className="shortcutsTable">
              <tbody>
                <tr>
                  <td>
                    Navigate Up:
                  </td>
                  <td>
                    <kbd>↑</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    Navigate Down:
                  </td>
                  <td>
                    <kbd>↓</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    Mark as read:
                  </td>
                  <td>
                    <kbd>←</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    Open in Browser:
                  </td>
                  <td>
                    <kbd>→</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    Unsubscribe/Delete:
                  </td>
                  <td>
                    <kbd>⌫</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    Show all notifications:
                  </td>
                  <td>
                    <kbd>{ctrlKey}</kbd>+<kbd>A</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    Show unread notifications:
                  </td>
                  <td>
                    <kbd>{ctrlKey}</kbd>+<kbd>E</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    Toggle Suzy:
                  </td>
                  <td>
                    {isMac && (
                      <React.Fragment>
                        <kbd>{ctrlKey}</kbd>+
                      </React.Fragment>
                    )}
                    <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
