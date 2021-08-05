import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormUpdateUsersPage } from './form-update-users.page';

const routes: Routes = [
  {
    path: '',
    component: FormUpdateUsersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormUpdateUsersPage]
})
export class FormUpdateUsersPageModule {}
