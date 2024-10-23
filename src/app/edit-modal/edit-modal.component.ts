import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() mode: 'create' | 'edit';
  @Input() rowData: any;
  @Output() updateData = new EventEmitter<any>();

  newItem: any = { name: '', address: '', email: '' };

  ngOnInit(): void {
    if (this.mode === 'edit' && this.rowData) {
      this.newItem = { ...this.rowData };
    }
  }

  save() {
    this.updateData.emit(this.newItem);
    this.close();
  }

  close() {
    this.rowData = null;
  }
}
