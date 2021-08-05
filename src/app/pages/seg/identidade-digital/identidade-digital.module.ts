import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IdentidadeDigitalPage } from './identidade-digital.page';
// https://www.npmjs.com/package/angularx-qrcode - Install
import { QRCodeModule } from 'angularx-qrcode';


const routes: Routes = [
  {
    path: '',
    component: IdentidadeDigitalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    QRCodeModule    
  ],  
  declarations: [IdentidadeDigitalPage],
  
}) 

export class IdentidadeDigitalPageModule {}
