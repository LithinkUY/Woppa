import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
var routes = [
    {
        path: '',
        component: MenuPage,
        children: [
            { path: 'options', loadChildren: '../menuoptions/menuoptions.module#OptionsPageModule' },
            { path: 'minhaconta', loadChildren: '../minhaconta/minhaconta.module#MinhaContaPageModule' },
            { path: 'config', loadChildren: '../menuconfig/menuconfig.module#MenuconfigModule' },
            { path: 'segmentos', loadChildren: '../segmentos/segmentos.module#SegmentosPageModule' },
            { path: 'usuarios', loadChildren: '../usuarios/usuarios.module#UsuariosPageModule' },
            { path: 'perfis', loadChildren: '../perfis/perfis.module#PerfisPageModule' },
            { path: 'permissoes', loadChildren: '../permissoes/permissoes.module#PermissoesPageModule' },
            { path: 'perfis-por-usuario', loadChildren: '../perfisusuario/perfisusuario.module#PerfisusuarioPageModule' },
            { path: 'grupos', loadChildren: '../grupos/grupos.module#GruposPageModule' },
            { path: 'pessoas', loadChildren: '../pessoas/pessoas.module#PessoasPageModule' },
            { path: 'menusadm', loadChildren: '../menusadm/menusadm.module#MenusadmPageModule' },
            { path: 'menuadm', loadChildren: '../menuadm/menuadm.module#MenuadmPageModule' },
            { path: 'menuger', loadChildren: '../menuger/menuger.module#MenugerPageModule' },
            { path: 'menucad', loadChildren: '../menucad/menucad.module#MenucadPageModule' },
            { path: 'menurel', loadChildren: '../menurel/menurel.module#MenurelPageModule' },
            { path: 'menufin', loadChildren: '../menufin/menufin.module#MenufinPageModule' },
            { path: 'menuseg', loadChildren: '../menuseg/menuseg.module#MenusegPageModule' },
            { path: 'menuestoq', loadChildren: '../menuestoq/menuestoq.module#MenuestoqPageModule' },
            { path: 'menupatrim', loadChildren: '../menupatrim/menupatrim.module#MenupatrimPageModule' },
            { path: 'menurh', loadChildren: '../menurh/menurh.module#MenurhPageModule' },
            { path: 'menuprod', loadChildren: '../menuprod/menuprod.module#MenuprodPageModule' },
            { path: 'produtos', loadChildren: '../produtos/produtos.module#ProdutosPageModule' },
            { path: 'menuopera', loadChildren: '../menuopera/menuopera.module#MenuoperaPageModule' },
            { path: 'developing', loadChildren: '../developing/developing.module#DevelopingPageModule' },
            { path: 'player', loadChildren: '../player/player.module#PlayerPageModule' },
            { path: 'videoaula', loadChildren: '../videoaula/videoaula.module#VideoaulaPageModule' },
            { path: 'menumidias', loadChildren: '../menumidias/menumidias.module#MenumidiasPageModule' },
            { path: 'filmes', loadChildren: '../multimedias/filmes/filmes.module#FilmesPageModule' },
            { path: 'livros', loadChildren: '../multimedias/livros/livros.module#LivrosPageModule' },
            // Administrativo
            //---------------
            { path: 'unidades', loadChildren: '../adm/cadastros/unidades/unidades.module#UnidadesPageModule' },
            { path: 'contatos', loadChildren: '../adm/cadastros/contatos/contatos.module#ContatosPageModule' },
            { path: 'editoras', loadChildren: '../adm/cadastros/editoras/editoras.module#EditorasPageModule' },
            { path: 'cursos', loadChildren: '../adm/cadastros/cursos/cursos.module#CursosPageModule' },
            { path: 'cursostipos', loadChildren: '../adm/cadastros/cursostipos/cursostipos.module#CursostiposPageModule' },
            { path: 'devices', loadChildren: '../seg/cadastros/devices/devices.module#DevicesPageModule' }
        ]
    }
];
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
            ],
            declarations: [MenuPage]
        })
    ], MenuPageModule);
    return MenuPageModule;
}());
export { MenuPageModule };
//# sourceMappingURL=menu.module.js.map