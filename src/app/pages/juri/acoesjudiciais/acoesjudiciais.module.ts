import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AcoesjudiciaisPage } from './acoesjudiciais.page';

const routes: Routes = [
  {
    path: '',
    component: AcoesjudiciaisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AcoesjudiciaisPage]
})
export class AcoesjudiciaisPageModule {}
