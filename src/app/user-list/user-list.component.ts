import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, concat, distinctUntilChanged, Observable, of, switchMap, tap } from 'rxjs';
import { GithubService, GitUser } from '../shared/services/github.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<any[]>;
  selectedUser: any;
  userLoading = false;
  userInput$ = new BehaviorSubject<string>('');
  public user: any;
  public searchTerm: string;

  constructor(private githubService: GithubService, private storageService: StorageService) { }

  ngOnInit() {
    this.getGithubAccounts();
    this.storageService.getAllIndexedDB('user').then((userResponse) => {
      console.log(userResponse);
    });
  }

  private getGithubAccounts() {
    this.users$ = concat(
      of([]), // default items

      this.userInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.userLoading = true),
        switchMap(term => this.githubService.getGithubAccounts(term).pipe(
          catchError((error) => {
            console.log(error);
            return of([]);
          }), // empty list on error
          tap(() => this.userLoading = false)
        ))
      )
    );
  }

  onSearchUser() {
    if (this.selectedUser.id) {
      this.githubService
        .getSingleUser(this.selectedUser.login)
        .subscribe(user => {
          this.user = user;
          this.storageService.saveIndexedDB("user", user);
        });
    }
    else {
      const date = new Date();
      const unixTimeStamp = Math.floor(date.getTime() / 1000);
      const errorSearch: GitUser = { login: this.selectedUser.login, id: unixTimeStamp, isGitUser: false, public_repos: 0, followers: 0, following: 0 };
      this.storageService.saveIndexedDB("user", errorSearch);
      this.user = errorSearch;

    }
    this.selectedUser = null;
  }

}

