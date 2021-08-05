import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryPage } from './delivery.page';
// import { SaveapproxPageModule } from '../saveapprox/saveapprox.module';




const routes: Routes = [
  {
    path: '',
    component: DeliveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
   // SaveapproxPageModule,    
    
  ],
  declarations: [DeliveryPage]
})
export class DeliveryPageModule {}
