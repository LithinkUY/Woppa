import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuicanhelpPage } from './menuicanhelp.page';

const routes: Routes = [
  {
    path: '',
    component: MenuicanhelpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuicanhelpPage]
})
export class MenuicanhelpPageModule {}
