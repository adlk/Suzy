interface IServerResponse {
  status: number;
  json: () => any;
}

// tslint:disable-next-line:no-var-requires
const request = process.type === 'renderer' ? window.fetch : require('electron-fetch');
// const octokit = new Octokit();

export async function fetch(url: string, options: any = {}): Promise<any> {
  const res: IServerResponse = await request(url, Object.assign(options, {
    headers: {
      'Authorization': `token ${localStorage.getItem('githubToken')}`,
      'Cache-Control': 'no-cache',
    },
  }));

  if (res.status === 200) {
    return await res.json();
  } else {
    throw res;
  }
}
