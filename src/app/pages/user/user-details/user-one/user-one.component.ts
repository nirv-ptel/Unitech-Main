import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { UserService } from '../../../../@service/user/user.service';

@Component({
  selector: 'ngx-user-one',
  templateUrl: './user-one.component.html',
  styleUrls: ['./user-one.component.scss']
})
export class UserOneComponent implements OnInit {

  order: number;
  UserDetails: any;
  UserQualification: any;
  UserExprience: any;
  UserFamily: any;
  UserHr: any;

  Qualification:boolean = false;
  Exprience:boolean = false;
  Family:boolean = false;
  Hr:boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private post: UserService, private fb: FormBuilder) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.order = params.user;
      this.post.ViewUserProfile(this.order).subscribe(data => {
        this.UserDetails = data;
        if(this.UserDetails.userQualificationData.length > 0) {
          this.UserQualification = this.UserDetails.userQualificationData;
          this.Qualification = true;
        }
        if(this.UserDetails.userExperienceData.length > 0) {
        this.UserExprience = this.UserDetails.userExperienceData;
        this.Exprience = true;
        }
        if(this.UserDetails.familyDetails.length > 0) {
        this.UserFamily = this.UserDetails.familyDetails;
        this.Family = true;
        }
        if(this.UserDetails.hrModel.id != null) {
        this.UserHr = this.UserDetails.hrModel;
        this.Hr = true;
        }
      });
    });
  }
}
