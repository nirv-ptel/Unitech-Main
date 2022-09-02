import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineService } from '../../../../@service/machine/machine.service';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';

@Component({
  selector: 'ngx-addmachine',
  templateUrl: './addmachine.component.html',
  styleUrls: ['./addmachine.component.scss']
})
export class AddmachineComponent implements OnInit {

  bloowroom: FormGroup;
  carding: FormGroup;
  drawframes: FormGroup;
  finisher: FormGroup;
  simplex: FormGroup;
  ringframe: FormGroup;
  winding: FormGroup;
  packing: FormGroup;
  utility: FormGroup;
  wasteroom: FormGroup;
  combers: FormGroup;
  lapformer: FormGroup;

  bloowroom1: boolean;
  carding1: boolean;
  drawframes1: boolean;
  finisher1: boolean;
  simplex1: boolean;
  ringframe1: boolean;
  winding1: boolean;
  packing1: boolean;
  utility1: boolean;
  wasteroom1: boolean;
  combers1: boolean;
  lapformer1: boolean;

  constructor(private fb: FormBuilder, private MachineProfile: MachineService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.bloowroom1 = true;
    this.bloowroom = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.carding = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.drawframes = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.finisher = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.simplex = this.fb.group({
      name: [''],
      descrption: ['',Validators.required],
    });
    this.ringframe = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.winding = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.packing = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.utility = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.wasteroom = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.combers = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
    this.lapformer = this.fb.group({
      name: ['',Validators.required],
      descrption: ['',Validators.required],
    });
  }
  onFormChange(a: string) {
    this.bloowroom.reset();
    this.carding.reset();
    this.drawframes.reset();
    this.finisher.reset();
    this.simplex.reset();
    this.ringframe.reset();
    this.winding.reset();
    this.packing.reset();
    this.utility.reset();
    this.wasteroom.reset();
    this.combers.reset();
    this.lapformer.reset();

    this.bloowroom1 = false;
    this.carding1 = false;
    this.drawframes1 = false;
    this.finisher1 = false;
    this.simplex1 = false;
    this.ringframe1 = false;
    this.winding1 = false;
    this.packing1 = false;
    this.utility1 = false;
    this.wasteroom1 = false;
    this.combers1 = false;
    this.lapformer1 = false;

    if (a == 'bloowroom') {
      this.bloowroom1 = true;
    }
    else if (a == 'carding') {
      this.carding1 = true;
    }
    else if (a == 'drawframes') {
      this.drawframes1 = true;
    }
    else if (a == 'finisher') {
      this.finisher1 = true;
    }
    else if (a == 'simplex') {
      this.simplex1 = true;
    }
    else if (a == 'ringframe') {
      this.ringframe1 = true;
    }
    else if (a == 'winding') {
      this.winding1 = true;
    }
    else if (a == 'packing') {
      this.packing1 = true;
    }
    else if (a == 'utility') {
      this.utility1 = true;
    }
    else if (a == 'wasteroom') {
      this.wasteroom1 = true;
    }
    else if (a == 'combers') {
      this.combers1 = true;
    }
    else if (a == 'lapformer') {
      this.lapformer1 = true;
    }
  }

  onBloowroomSubmit() {
    this.MachineProfile.CreateBloowRoom(this.bloowroom.value).subscribe((data: any) => {
      this.bloowroom.reset();
      this.allAlert('success', `${data.Data.name} Created !`, 'Successfully Create Bloowroom');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onCardingSubmit() {
    this.MachineProfile.CreateCarding(this.carding.value).subscribe((data: any) => {
      this.carding.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Carding');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onDrawframesSubmit() {
    this.MachineProfile.CreateDrawframes(this.drawframes.value).subscribe((data: any) => {
      this.drawframes.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Drawframes');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onFinisherSubmit() {
    this.MachineProfile.CreateFinisher(this.finisher.value).subscribe((data: any) => {
      this.finisher.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Finisher');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onSimplexSubmit() {
    this.MachineProfile.CreateSimplex(this.simplex.value).subscribe((data: any) => {
      this.simplex.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Simplex');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onRingframeSubmit() {
    this.MachineProfile.CreateRingframe(this.ringframe.value).subscribe((data: any) => {
      this.ringframe.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Ringframes');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onWindingSubmit() {
    this.MachineProfile.CreateWinding(this.winding.value).subscribe((data: any) => {
      this.winding.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Winding');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onPackingSubmit() {
    this.MachineProfile.CreatePacking(this.packing.value).subscribe((data: any) => {
      this.packing.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Packing');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onUtilitySubmit() {
    this.MachineProfile.CreateUtility(this.utility.value).subscribe((data: any) => {
      this.utility.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Utility');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onWasteroomSubmit() {
    this.MachineProfile.CreateWasteroom(this.wasteroom.value).subscribe((data: any) => {
      this.wasteroom.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Wasteroom');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onCombersSubmit() {
    this.MachineProfile.CreateCombers(this.combers.value).subscribe((data: any) => {
      this.combers.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Combers');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }
  onLapformerSubmit() {
    this.MachineProfile.CreateLapformer(this.lapformer.value).subscribe((data: any) => {
      this.lapformer.reset();
      this.allAlert('success', `${data.name} Created !`, 'Successfully Create Lapformer');
    },
    (error: any) => {
      this.allAlert('danger', `Not Created !`, `something wrong`);
    });
  }

  allAlert(alertMsg, nameMachine, typeMachine) {
    const config = {
      status: alertMsg,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    this.toastrService.show(
      `${typeMachine}`,
      `${nameMachine}`,
      config);
  }

}
