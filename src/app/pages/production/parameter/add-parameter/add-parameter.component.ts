import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineParameterService } from '../../../../@service/machine-parameter/machine-parameter.service';
import { MachineService } from '../../../../@service/machine/machine.service';

@Component({
  selector: 'ngx-add-parameter',
  templateUrl: './add-parameter.component.html',
  styleUrls: ['./add-parameter.component.scss']
})
export class AddParameterComponent implements OnInit {

  machineName: string;
  id: number;

  bloowroompara: FormGroup;
  cardingpara: FormGroup;
  drawframespara: FormGroup;
  finisherpara: FormGroup;
  simplexpara: FormGroup;
  ringframepara: FormGroup;
  windingpara: FormGroup;
  packingpara: FormGroup;
  utilitypara: FormGroup;
  wasteroompara: FormGroup;

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

  bloowroom: any;
  carding: any;
  drawframes: any;
  finisher: any;
  simplex: any;
  ringframe: any;
  winding: any;
  packing: any;
  utility: any;
  wasteroom: any;

  private regex: RegExp = new RegExp('^[0-9]*$');


  constructor(private router: Router,private MachineProfile :MachineService, private route: ActivatedRoute,private fb: FormBuilder,private MachinePara: MachineParameterService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.machineName = params.type;
      this.id = params.id;
    });

    this.bloowroom1 = true;
    this.bloowroompara = this.fb.group({
      deliveryspeed: ['',Validators.required],
      silverhank: ['',Validators.required],
      machineefficency: [''],
    });
    this.cardingpara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.drawframespara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.finisherpara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.simplexpara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.ringframepara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.windingpara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.packingpara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.utilitypara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });
    this.wasteroompara = this.fb.group({
      para1: [''],
      para2: [''],
      para3: [''],
      para4: [''],
    });

    if(this.machineName == 'Bloowroom') {


      this.bloowroom1 = true;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Carding') {
      this.bloowroom1 = false;
      this.carding1 = true;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Drawframes') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = true;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Finisher') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = true;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Simplex') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = true;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Ringframe') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = true;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Winding') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = true;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Packing') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = true;
      this.utility1 = false;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Utility') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = true;
      this.wasteroom1 = false;
    }
    else if(this.machineName == 'Wasteroom') {
      this.bloowroom1 = false;
      this.carding1 = false;
      this.drawframes1 = false;
      this.finisher1 = false;
      this.simplex1 = false;
      this.ringframe1 = false;
      this.winding1 = false;
      this.packing1 = false;
      this.utility1 = false;
      this.wasteroom1 = true;
    }
    else {
      this.router.navigate(['/pages']);
    }
  }

  NumberOnly(event) {
    let inputValue = event.key;
    if((inputValue && !String(inputValue).match(this.regex)) && !String(event.key).match('Backspace')) {
      event.preventDefault();
    }
  }

  onBloowroomSubmit() {
    this.bloowroompara.markAsDirty();
    this.MachinePara.AddBloowRoomParameter(this.bloowroompara.value).subscribe((data:any) => {
      this.bloowroom = data;
      this.MachinePara.AssignBloowRoomParameter(this.id,this.bloowroom.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.bloowroompara.reset();
    });
  }
  onCardingSubmit() {
    this.MachinePara.AddCardingParameter(this.cardingpara.value).subscribe((data:any) => {
      this.carding = data;
      this.MachinePara.AssignCardingParameter(this.id,this.carding.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.cardingpara.reset();
    });
  }
  onDrawframesSubmit() {
    this.MachinePara.AddDrawframesParameter(this.drawframespara.value).subscribe((data:any) => {
      this.drawframes = data;
      this.MachinePara.AssignDrawframesParameter(this.id,this.drawframes.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.drawframespara.reset();
    });
  }
  onFinisherSubmit() {
    this.MachinePara.AddFinisherParameter(this.finisherpara.value).subscribe((data:any) => {
      this.finisher = data;
      this.MachinePara.AssignFinisherParameter(this.id,this.finisher.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.finisherpara.reset();
    });
  }
  onSimplexSubmit() {
    this.MachinePara.AddSimplexParameter(this.simplexpara.value).subscribe((data:any) => {
      this.simplex = data;
      this.MachinePara.AssignSimplexParameter(this.id,this.simplex.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.simplexpara.reset();
    });
  }
  onRingframeSubmit() {
    this.MachinePara.AddRingframeParameter(this.ringframepara.value).subscribe((data:any) => {
      this.ringframe = data;
      this.MachinePara.AssignRingframeParameter(this.id,this.ringframe.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.ringframepara.reset();
    });
  }
  onWindingSubmit() {
    this.MachinePara.AddWindingParameter(this.windingpara.value).subscribe((data:any) => {
      this.winding = data;
      this.MachinePara.AssignWindingParameter(this.id,this.winding.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.windingpara.reset();
    });
  }
  onPackingSubmit() {
    this.MachinePara.AddPackingParameter(this.packingpara.value).subscribe((data:any) => {
      this.packing = data;
      this.MachinePara.AssignPackingParameter(this.id,this.packing.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.packingpara.reset();
    });
  }
  onUtilitySubmit() {
    this.MachinePara.AddUtilityParameter(this.utilitypara.value).subscribe((data:any) => {
      this.utility = data;
      this.MachinePara.AssignUtilityParameter(this.id,this.utility.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.utilitypara.reset();
    });
  }
  onWasteroomSubmit() {
    this.MachinePara.AddWasteroomParameter(this.wasteroompara.value).subscribe((data:any) => {
      this.wasteroom = data;
      this.MachinePara.AssignWasteroomParameter(this.id,this.wasteroom.machineId).subscribe((data:any) => {
      });
      alert("Date Submited Success Fully...");
      this.wasteroompara.reset();
    });
  }

}
