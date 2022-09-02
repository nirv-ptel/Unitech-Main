import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../../@service/purchase/item/item.service';

@Component({
  selector: 'ngx-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      itemcode: ['',Validators.required],
      itemDescription: ['',Validators.required],
      station: ['',[Validators.required]],
    });
  }

  onItemSubmit() {
    this.itemService.CreateItem(this.itemForm.value).subscribe((data:any) => {
      alert("data successfully uploaded");
      this.itemForm.reset();
    },
    (Error: any) => {
      alert("data not uploaded");
    });
  }
}
