import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';


@Component({
  selector: 'app-developing',
  templateUrl: './developing.page.html',
  styleUrls: ['./developing.page.scss'],
})
export class DevelopingPage implements OnInit {

  public AppName: string = environment.AppNameSigla;
  public title = this.Authorizer.formTitle; // 'Cadastro Usuários';
  public subtitle = this.Authorizer.formSubTitle; // 'Usuário';

  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private env: EnvService    
    

  ) { }

  ngOnInit() {
  }

  goBack() {    
      this.navCtrl.back();    
  }

}
