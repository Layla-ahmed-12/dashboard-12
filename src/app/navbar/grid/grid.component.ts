import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class GridComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('myWindow') myWindow: jqxWindowComponent;
  @ViewChild('name', { static: false }) name: jqxInputComponent;
  @ViewChild('address', { static: false }) address: jqxInputComponent;
  @ViewChild('email', { static: false }) email: jqxInputComponent;
  @ViewChild('confirmWindow') confirmWindow: jqxWindowComponent;

  editrow: number = -1;
  deleteRowIndex: number = -1;

  source: any = {
    localdata: JSON.parse(localStorage.getItem('data') || '[]') || [
      { name: 'John Doe', address: '123 Main St', email: 'john@example.com' },
      { name: 'Jane Smith', address: '456 Oak St', email: 'jane@example.com' },
    ],
    dataFields: [
      { name: 'name', type: 'string' },
      { name: 'address', type: 'string' },
      { name: 'email', type: 'string' },
    ],
    datatype: 'array',
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  ngOnInit(): void {
    this.refreshGrid();
  }

  getWidth(): any {
    return document.body.offsetWidth < 850 ? '90%' : 850;
  }

  columns: any[] = [
    { text: 'Name', datafield: 'name', align: 'center', width: 200 },
    { text: 'Address', datafield: 'address', align: 'center', width: 250 },
    { text: 'Email', datafield: 'email', width: 300, align: 'center' },
    {
      text: 'Actions',
      datafield: 'actions',
      columntype: 'button',
      cellsrenderer: (): string => 'Edit / Delete',
      buttonclick: (row: number): void => {
        const action = prompt('Enter "edit" to edit or "delete" to delete:');
        if (action && action.toLowerCase() === 'edit') {
          this.editrow = row;
          let dataRecord = this.myGrid.getrowdata(this.editrow);
          this.name.val(dataRecord.name);
          this.address.val(dataRecord.address);
          this.email.val(dataRecord.email);
          this.myWindow.position({ x: '50%', y: '30%' });
          this.myWindow.open();
        } else if (action && action.toLowerCase() === 'delete') {
          this.deleteRowIndex = row;
          const dataRecord = this.myGrid.getrowdata(this.deleteRowIndex);
          this.confirmWindow.position({ x: '50%', y: '30%' });
          this.confirmWindow.open();
        }
      },
    },
  ];

  refreshGrid() {
    this.dataAdapter.localdata = this.source.localdata;
    this.dataAdapter.dataBind();
    this.myGrid.updatebounddata();
  }

  saveChanges() {
    if (this.editrow >= 0) {
      const updatedItem = {
        name: this.name.val(),
        address: this.address.val(),
        email: this.email.val(),
      };
      this.source.localdata[this.editrow] = updatedItem;
      localStorage.setItem('data', JSON.stringify(this.source.localdata));
      this.refreshGrid();
      this.myWindow.close();
    }
  }

  addPopup() {
    this.name.val('');
    this.address.val('');
    this.email.val('');
    this.myWindow.position({ x: '50%', y: '30%' });
    this.myWindow.open();
  }

  saveBtn() {
    if (this.editrow >= 0) {
      this.saveChanges();
    } else {
      const newItem = {
        name: this.name.val(),
        address: this.address.val(),
        email: this.email.val(),
      };
      this.source.localdata.push(newItem);
      localStorage.setItem('data', JSON.stringify(this.source.localdata));
      this.refreshGrid(); 
      this.myWindow.close();
    }
  }

  cancelBtn() {
    this.myWindow.close();
  }

  confirmDelete() {
    if (this.deleteRowIndex >= 0) {
      this.source.localdata.splice(this.deleteRowIndex, 1);
      localStorage.setItem('data', JSON.stringify(this.source.localdata));
      this.refreshGrid();
      this.confirmWindow.close();
    }
  }

  cancelDelete() {
    this.confirmWindow.close();
  }
}
