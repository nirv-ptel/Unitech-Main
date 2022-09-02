import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../@service/user/user.service';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  PasswordForm: FormGroup;

  password: boolean = true;
  required: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userProfile: UserService
  ) { }

  ngOnInit() {

    this.userProfile.ViewRole().subscribe((data :any) => {
    })

    this.firstForm = this.fb.group({
      username: [''],
      email: [''], //[Validators.email]
      address: [''],
      pinCode: [''],
      photo: [''],
      phoneno: [''], //,Validators.required
      telephoneNumber: [''],
      dob: [''],
      maritalStatus: [''], //,Validators.required
      nationality: [''],
      nativePalace: [''],
      indentification: [''],
      bloodGroup: [''],
      status: [true],
      roles: this.fb.array([this.fb.control('')]),
    });

    this.PasswordForm = this.fb.group({
      password: ['', Validators.required],
      c_password: ['', Validators.required],
    })

    this.secondForm = this.fb.group({
      userQualificationData: this.fb.array([this.Qualification()]),
    });

    this.thirdForm = this.fb.group({
      userExperienceData: this.fb.array([this.Experience()]),
    });

    this.fourthForm = this.fb.group({
      familyDetails: this.fb.array([this.familyDetail()]),
    });

    this.fifthForm = this.fb.group({
      interviewBy: [''],
      InterviewDate: [''],
      Post: [''],
      salary: [''],
      doj: [''],
      periodOfProbation: [''],
      remarks: [''],
    });

  }

  Qualification() {
    return this.fb.group({
      examination: [''],
      universityBoard: [''],
      durationOfCourse: [''],
      yearOfPassing: [''],
      grade: [''],
    })
  }
  Experience() {
    return this.fb.group({
      organization: [''],
      position: [''],
      reporting: [''],
      yearOfExperience: [''],
      salary: [''],
      reasonOfLeaving: [''],
    })
  }
  familyDetail() {
    return this.fb.group({
      name: [''],
      age: [''],
      relationship: [''],
      occupation: [''],
      position: [''],
      offcialTelNumber: [''],
    })
  }

  get QualificationGet() {
    return this.secondForm.get('userQualificationData') as FormArray;
  }
  get ExperienceGet() {
    return this.thirdForm.get('userExperienceData') as FormArray;
  }
  get FamilyDetailGet() {
    return this.fourthForm.get('familyDetails') as FormArray;
  }
  get RoleGet() {
    return this.firstForm.get('roles') as FormArray;
  }

  QualificationAdd() {
    this.QualificationGet.push(this.Qualification());
  }
  ExperienceAdd() {
    this.ExperienceGet.push(this.Experience());
  }
  FamilyDetailAdd() {
    this.FamilyDetailGet.push(this.familyDetail());
  }

  QualificationRemove(i: number) {
    if (i >= 1) {
      this.QualificationGet.removeAt(i);
    }
  }
  ExperienceRemove(i: number) {
    if (i >= 1) {
      this.ExperienceGet.removeAt(i);
    }
  }
  FamilyDetailRemove(i: number) {
    if (i >= 1) {
      this.FamilyDetailGet.removeAt(i);
    }
  }


  onFirstSubmit() {

  }
  onSecondSubmit() {

  }
  onThirdSubmit() {

  }
  onFourthSubmit() {

  }

  passwordHide(event) {
    if (event == 'LABOR') {
      this.password = false;
    } else {
      this.password = true;
      this.PasswordForm.value.password = null;
      this.PasswordForm.value.c_password = null;
    }

  }

  onFifthSubmit() {
    let b = this.secondForm.value.userQualificationData;
    for (let i = 0; i < this.secondForm.value.userQualificationData.length; i++) {
      if (b[i].examination != "" && b[i].universityBoard != "" && b[i].yearOfPassing != "") {
      }
    }


    this.userProfile.CreateUserProfile(this.firstForm.value).subscribe((data1: any) => {
      let b = this.secondForm.value.userQualificationData;
      let c = this.thirdForm.value.userExperienceData;
      let d = this.fourthForm.value.familyDetails;
      let f = this.thirdForm.value.userExperienceData;


      if (this.firstForm.value.roles[0] != 'LABOR') {
        this.userProfile.CreateUserPassword(this.PasswordForm.value).subscribe((data: any) => {
          this.userProfile.userPasswordAssign(data.id, data1.id).subscribe((data: any) => {
          });
        })
      }


      for (let i = 0; i < this.secondForm.value.userQualificationData.length; i++) {
        if (b[i].examination != "" && b[i].universityBoard != "" && b[i].yearOfPassing != "") {
          this.userProfile.CreateUserQualification(b[i]).subscribe((data: any) => {
            this.userProfile.userQualificationAssign(data.id, data1.id).subscribe((data: any) => {
            });
          });
        }
      }
      for (let i = 0; i < this.thirdForm.value.userExperienceData.length; i++) {
        if (c[i].organization != "" && c[i].yearOfExperience != "" && c[i].position != "") {
          this.userProfile.CreateUserExperience(c[i]).subscribe((data: any) => {
            this.userProfile.userExperienceAssign(data.id, data1.id).subscribe((data: any) => {
            });
          });
        }
      }
      for (let i = 0; i < this.fourthForm.value.familyDetails.length; i++) {
        if (d[i].name != "" && d[i].age != "" && d[i].relationship != "") {
          this.userProfile.CreateUserFamily(d[i]).subscribe((data: any) => {
            this.userProfile.userFamilyAssign(data.id, data1.id).subscribe((data: any) => {
            });
          });
        }
      }
      this.userProfile.CreateUserHrConformation(this.fifthForm.value).subscribe((data: any) => {
        // alert(this.fifthResponse.id+"CreateUserHrConformation");
        this.userProfile.userHrConformationAssign(data.id, data1.id).subscribe((data: any) => {
          alert("userHrConformationAssign");
        });
      });
    },
      (Error: any) => {
        alert('not submited');
      });
  }

  // onFifthSubmit() {
  //   this.fifthForm.markAsDirty();

  //   this.userProfile.CreateUserProfile(this.firstForm.value).subscribe((data:any) => {
  //     this.firstResponse = data;
  //     // alert(this.firstResponse.id+"CreateUserProfile");

  //     this.userProfile.CreateUserQualification(this.secondForm.value).subscribe((data:any) => {
  //       this.secondResponse = data;
  //       // alert(this.secondResponse.id+"CreateUserQualification");
  //       this.userProfile.userQualificationAssign(this.secondResponse.id,this.firstResponse.id).subscribe((data:any) => {
  //         // alert("userQualificationAssign");
  //       });
  //     });

  //     this.userProfile.CreateUserExperience(this.thirdForm.value).subscribe((data:any) => {
  //       this.thirdResponse = data;
  //       // alert(this.thirdResponse.id+"CreateUserExperience");
  //       this.userProfile.userExperienceAssign(this.thirdResponse.id,this.firstResponse.id).subscribe((data:any) => {
  //         // alert("userExperienceAssign");
  //       });
  //     });

  //     this.userProfile.CreateUserFamily(this.fourthForm.value).subscribe((data:any) => {
  //       this.fourthResponse = data;
  //       // alert(this.fourthResponse.id+"CreateUserFamily");
  //       this.userProfile.userFamilyAssign(this.fourthResponse.id,this.firstResponse.id).subscribe((data:any) => {
  //         // alert("userFamilyAssign");
  //       });
  //     });

  //     this.userProfile.CreateUserHrConformation(this.fifthForm.value).subscribe((data:any) => {
  //       this.fifthResponse = data;
  //       // alert(this.fifthResponse.id+"CreateUserHrConformation");
  //       this.userProfile.userHrConformationAssign(this.fifthResponse.id,this.firstResponse.id).subscribe((data:any) => {
  //         // alert("userHrConformationAssign");
  //       });
  //     });
  //   });

  //   alert("Date Submited Success Fully...")
  // }
}
