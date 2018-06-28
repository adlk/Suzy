export interface IGithubRepositoryOwner {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface IGithubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: IGithubRepositoryOwner;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage?: any;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language?: any;
  has_issues: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url?: any;
  open_issues_count: number;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface IGithubRepositoryOrganization {
  login: string;
  id: number;
  url: string;
  repos_url: string;
  events_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
}

export interface IGithubNotification {
  id: number;
  last_read_at: string;
  reason: string;
  type: string;
  repository: IGithubRepository;
  subject: {
    title: string;
    url: string;
    latest_comment_url: string;
    type: string;
  };
  subscription_url: string;
  unread: boolean;
  updated_at: string;
  url: string;
}

export interface IGithubUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

// export interface IGithubIssue {
//   author_association: string;
//   body: string;
//   created_at: string;
//   html_url: string;
//   id: number;
//   issue_url: string;
//   node_id: string;
//   updated_at: string;
//   url: string;
//   user: IGithubUser;
// }

export interface IGithubIssue {
  id: number;
  html_url: string;
  number: number;
  title: string;
  user: IGithubUser;
  state: string;
  locked: boolean;
  assignee: IGithubUser;
  assignees: IGithubUser[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  body: string;
  closed_by: IGithubUser;
}

export interface IGithubIssueComment {
  author_association: string;
  body: string;
  created_at: string;
  html_url: string;
  id: number;
  issue_url: string;
  node_id: string;
  updated_at: string;
  url: string;
  user: IGithubUser;
}

// incomplete
export interface IGithubPullRequest {
  additions: number;
  assignee?: IGithubUser;
  assignees: IGithubUser[];
  author_association: string;
  base: {
    label: string;
    ref: string;
    sha: string;
    user: IGithubUser;
    repo: IGithubRepository;
  };
  body: string;
  changed_files: number;
  closed: boolean;
  closed_at: string;
  comments: number;
  comments_url: string;
  commits: number;
  commits_url: string;
  created_at: string;
  deletions: number;
  diff_url: string;
  head: {
    label: string;
    ref: string;
    sha: string;
    user: IGithubUser;
    repo: IGithubRepository;
  };
  html_url: string;
  id: number;
  issue_url: string;
  labels: any[];
  locked: boolean;
  maintainer_can_modify: false;
  merge_commit_sha: string;
  mergeable_state: string;
  merged: boolean;
  merged_at: string;
  merged_by: IGithubUser;
  node_id: string;
  number: number;
  patch_url: string;
  requested_reviewers: IGithubUser[];
  review_comment_url: string;
  review_comments: number;
  review_comments_url: string;
  state: string;
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: IGithubUser;
}
