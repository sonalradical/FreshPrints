import { Component, OnInit } from '@angular/core';
import { GitUser } from '../shared/services/github.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public users: GitUser[];
  constructor(
    private storageService: StorageService,
  ) { }


  ngOnInit() {
    this.storageService.getAllIndexedDB('user').then((userResponse) => {
      this.users = userResponse;
    });
  }

  onClearHistory() {
    this.storageService.clearStore('user');
    this.users = [];
  }
}
