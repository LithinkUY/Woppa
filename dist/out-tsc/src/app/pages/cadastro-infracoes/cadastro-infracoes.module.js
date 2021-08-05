import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CadastroInfracoesPage } from './cadastro-infracoes.page';
var routes = [
    {
        path: '',
        component: CadastroInfracoesPage
    }
];
var CadastroInfracoesPageModule = /** @class */ (function () {
    function CadastroInfracoesPageModule() {
    }
    CadastroInfracoesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CadastroInfracoesPage]
        })
    ], CadastroInfracoesPageModule);
    return CadastroInfracoesPageModule;
}());
export { CadastroInfracoesPageModule };
//# sourceMappingURL=cadastro-infracoes.module.js.map