import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerificacionPageRoutingModule } from './verificacion-routing.module';
import { VerificacionPage } from './verificacion.page';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { VerificacionService } from 'src/app/services/verificacion.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificacionPageRoutingModule,
    NgxMaskIonicModule,
  ],
  providers: [
    VerificacionService
  ],
  declarations: [VerificacionPage]
})
export class VerificacionPageModule {}
