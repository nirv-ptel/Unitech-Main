import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbMenuService } from '@nebular/theme';
import { ContractService } from '../../../../@service/purchase/contract/contract.service';
import { ItemService } from '../../../../@service/purchase/item/item.service';
import { PartyLotService } from '../../../../@service/purchase/party-lot/party-lot.service';
import { VenderService } from '../../../../@service/purchase/vender/vender.service';

@Component({
  selector: 'ngx-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {

  contractForm: FormGroup;

  vender: any;
  item: any;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private venderService: VenderService,
    private contractService: ContractService,
    private partyLotService: PartyLotService,
  ) { }

  ngOnInit(): void {

    this.contractForm = this.fb.group({
      vendorModel: this.fb.group({
        id: [null],
      }),
      itemdata: this.fb.group({
        id: [null],
      }),
      quantity: [null,Validators.required],
      contractNo: [null],
      invoiceno: [null],
      originname: [null],
      portOfDischarged: [null],
      blNo: [null],
      containerNo: [null],
      station: [null],
      vom: [null],
      press_running_no: [null],
      gstno: [null],
      panno: [null],
      trash: [null],
      mic: [null],
      broker: [null],
      length: [null],
      moisture: [null],
      status: [false],
      partyLotModels: this.fb.array([this.AddpartyLot()]),
    });

    this.venderService.ViewVender().subscribe(data => {
      this.vender = data.Data;
    });

    this.itemService.ViewItem().subscribe(data => {
      this.item = data.Data;
    });
  }

  onContractSubmit() {
    this.contractForm.markAsDirty();
    let venconData = this.contractForm.value;

    this.contractService.CreateContract(venconData).subscribe((data:any) => {
      let a = data.partyLotModels;

    //   this.contractService.ContractVender(data.Data.id,venconData.vendorData).subscribe((data:any) => {
    //   });
    //   this.contractService.ContractItem(data.Data.id,venconData.itemdata).subscribe((data:any) => {
    //   });

    //   let a = this.contractForm.value.partyplotNumber;
    //   for(let i = 0; i < a.length;i++) {
    //     var b= {};
    //     var c = {'id':data.Data.id};
    //     b['partyNumber'] = a[i];
    //     b['contract'] = c;
    //     this.partyLotService.CreateParty(b).subscribe((data:any) => {
    //     });
    //   }
    //   this.contractForm.reset();

      alert("data successfully uploaded");
    },
    (Error: any) => {
      alert("data not uploaded");
    });
  }

  get partyLot() {
    return this.contractForm.get('partyLotModels') as FormArray;
  }

  AddpartyLot() {
    return this.fb.group({
      partyNumber: [null],
    });
  }

  quantity(event) {
    let partylotno =Math.ceil(event.target.value/100);
    this.partyLot.clear();
    for(let i = 0; i < partylotno; i++) {
      this.partyLot.push(this.AddpartyLot()); //pop
    }
  }

}
