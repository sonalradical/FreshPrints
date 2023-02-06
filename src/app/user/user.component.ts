import { Component, Input, OnInit } from '@angular/core';
import { GitUser } from '../shared/services/github.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: GitUser;
}
