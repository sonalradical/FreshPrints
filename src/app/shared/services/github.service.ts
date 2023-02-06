import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  apiURL = "https://api.github.com/";
  private _gitHubAccountsCache = new Map<string, []>();

  constructor(private http: HttpClient) { }

  getGithubAccounts(searchKeyword: string) {
    if (this._gitHubAccountsCache.has(searchKeyword)) {
      return of(this._gitHubAccountsCache.get(searchKeyword));
    }

    if (searchKeyword && searchKeyword.length >= 3) {
      return this.http
        .get<any>(`${this.apiURL}search/users?q=${searchKeyword}`)
        .pipe(map(rsp => rsp.items), tap(data => this._gitHubAccountsCache.set(searchKeyword, data)));
    } else {
      return of([]);
    }
  }

  // Get single user
  getSingleUser(username: string) {
    return this.http.get(`${this.apiURL}users/${username}`);
  }
}

export class GitUser {
  login: string;
  id: number;
  avatar_url?: string;
  url?: string;
  html_url?: string;
  location?: string;
  email?: string;
  hireable?: any;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  isGitUser?: boolean = true;
}