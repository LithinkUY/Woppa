import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { environment } from "../../../environments/environment.prod"
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private db: Storage,
    public navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService
  ) { }

  ngOnInit() {
    // this.alertService.showLoader('Aguarde... Carregando.')
    // this.alertService.presentToast('Processando...');
    this.db.get('LSU').then((LSU) => {
      if (LSU) {
        const SU = JSON.parse(atob(LSU));
        // this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
        // this.NomeUsuarioSistema = SU[0].Nome;
        // console.log('Olá, ' + SU[0].Nome + '! Você foi a última pessoa a entrar no sistema nesse dispositivo.');
        this.Authorizer.CodigoUsuarioSistema = SU[0].CodigoUsuario;
        this.Authorizer.CodigoUsuarioSuporte = SU[0].CodigoUsuarioSuporte;
        this.Authorizer.NomeUsuarioSistema = SU[0].Nome+' '+SU[0].SobreNome;
        this.Authorizer.Matricula = SU[0].Matricula;
      }
    });

    this.db.get('HKEY').then((HKEY) => {
      if (HKEY) {
        this.Authorizer.HashKey = HKEY
        this.delay(1000);
        this.Authorizer.consultarPermisoes();
        this.navCtrl.navigateForward('/menu/options/tabs/main');
      } else{
        this.navCtrl.navigateForward('login');
      }  
    });

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
      return; // console.log(('fired');
    });
  }

  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


}
