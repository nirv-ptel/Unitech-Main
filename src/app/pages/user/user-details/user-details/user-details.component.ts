import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../@service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [DecimalPipe]
})

export class UserDetailsComponent implements OnInit {

  source: any = [];

  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },

    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      username: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phoneno: {
        title: 'Mobile No.',
        type: 'number',
      }
    },
  };


  constructor(private post: UserService, private router: Router, pipe: DecimalPipe, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.post.ViewAllUserProfile().subscribe(data => {
      this.source = data.Total_User;
    });
  }

  ngOnDestroy(): void { }

  ViewUserDetails(event) {
    this.router.navigate(["/pages/user/user/userone"], { queryParams: { user: event.id } });
  }
}
