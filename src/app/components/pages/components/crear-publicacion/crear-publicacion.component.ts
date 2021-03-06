import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrearPublicacion1Component } from '../crear-publicacion1/crear-publicacion1.component';
import { User } from '../../../../interfaces/user.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    if (this.foto.length > 1) {
      this.foto = [];
    }
    this.foto.push(...event.addedFiles);

    this.openDialog1();
  }

  onRemove(event: any) {

    this.foto.splice(this.foto.indexOf(event), 1);
  }

  onFileSelected(event: any): boolean {

    if (this.foto.length > 1) {
      this.foto = [];
    }

    if (event.target.files[0]) {
      const archivoCapturado = event.target.files[0];
      this.foto.push(archivoCapturado);


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

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
