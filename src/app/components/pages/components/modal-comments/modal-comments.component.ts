import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-comments',
  templateUrl: './modal-comments.component.html',
  styleUrls: ['./modal-comments.component.css']
})
export class ModalCommentsComponent implements OnInit {

  dataInjected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dataInjected = this.data;
  }

}
