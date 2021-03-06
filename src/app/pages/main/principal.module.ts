import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';


const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrincipalPage],
  bootstrap: [ PrincipalPage ],
})
export class principalPageModule {}
