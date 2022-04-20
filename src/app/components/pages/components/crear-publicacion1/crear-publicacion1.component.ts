import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CrearPublicacionComponent } from '../crear-publicacion/crear-publicacion.component';
import { environment } from '../../../../../environments/environment';
import { HttpConfigService } from '../../../../services/http-config.service';
import { DescartarPublicacionComponent } from '../descartar-publicacion/descartar-publicacion.component';
import { CreandoPublicacionComponent } from '../creando-publicacion/creando-publicacion.component';
@Component({
  selector: 'app-crear-publicacion1',
  templateUrl: './crear-publicacion1.component.html',
  styleUrls: ['./crear-publicacion1.component.css'],
})
export class CrearPublicacion1Component implements OnInit {
  currentUser!: any;
  previsualizacion!: string;
  location!: string;
  description!: string;

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<CrearPublicacion1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private httpService: HttpConfigService
  ) {
    this.extraerBase64(data.foto).then((imagen: any) => {

      this.previsualizacion = imagen.base;
    });

    this.currentUser = data.user.user;
  }

  ngOnInit(): void {}

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
        return true;
      } catch (e) {
        return null;
      }
    });

  goToCrearPublicacion() {
    const dialogRef = this.dialog.open(CrearPublicacionComponent, {
      disableClose: false,
      data: { user: this.currentUser },
    });

    this.dialogRef.close();

    dialogRef.afterClosed().subscribe((result) => {});
  }

  locate() {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const longitude = success.coords.longitude;
        const latitude = success.coords.latitude;
        const endpoint = 'mapbox.places';
        const access_token = environment.mapBoxToken;
        const apiUrl = `https://api.mapbox.com/geocoding/v5/${endpoint}/${longitude},${latitude}.json?types=place&access_token=${access_token}`;

        fetch(apiUrl)
          .then((resp) => {
            return resp.json();
          })
          .then((result) => {
            this.location = result.features[0].place_name;
          })
          .catch((error) => {});
      },
      (error) => {}
    );
  }

  omitir() {
    const dialogRef = this.dialog.open(DescartarPublicacionComponent, {
      disableClose: false,
      data: { user: this.currentUser },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  publicar() {

    const dialogRef = this.dialog.open(CreandoPublicacionComponent, {
      disableClose: false,
      data: {
        user: this.currentUser,
        foto: this.data.foto,
        description: this.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});


  }
}
