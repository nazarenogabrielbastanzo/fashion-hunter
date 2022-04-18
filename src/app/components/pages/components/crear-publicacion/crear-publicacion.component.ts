import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearPublicacion1Component } from '../crear-publicacion1/crear-publicacion1.component';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css'],
})
export class CrearPublicacionComponent implements OnInit {
  foto: File[] = [];

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CrearPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    console.log(event);
    if (this.foto.length > 1) {
      this.foto = [];
    }
    this.foto.push(...event.addedFiles);
    console.log(this.foto);

    this.openDialog1();
  }

  onRemove(event: any) {
    console.log(event);

    this.foto.splice(this.foto.indexOf(event), 1);
  }

  onFileSelected(event: any): boolean {

    if (this.foto.length > 1) {
      this.foto = [];
    }

    if (event.target.files[0]) {
      const archivoCapturado = event.target.files[0];
      this.foto.push(archivoCapturado);

      console.log(this.foto);

      this.openDialog1();

      return true;
    } else {
      return false;
    }
  }

  openDialog1() {
    const dialogRef = this.dialog.open(CrearPublicacion1Component, {
      disableClose: false,
      data: { foto: this.foto[0], user: this.data },
    });

    this.dialogRef.close();

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
