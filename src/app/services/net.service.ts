import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetWork {
  public result: any = [];
  public isInternet: any = false;
  public IP: any = '';
  constructor(
    private platform: Platform,
    private network: Network
  ) {

    
  }
  ngOnInit() {
    const ipAPI: any = 'https://api.ipify.org?format=json';
    fetch(ipAPI).then(response => response.json()).then(
        data => this.isInternet = true
    ).catch(() => { this.isInternet = false; });

  }

  NetworkStatus = async function(pIP: string) {
    return new Promise((resolve) => {
        const result = [];
        let sucess =  false;
        let message = '';
        let type = '';
        let status = '';
        this.isInternet = (!!pIP);
        if (!this.platform.is('cordova')) {
            // do nothing
            sucess = this.isInternet;
            if (sucess) {
                message = 'On-Line';
                status = 'On-Line';
            } else {
                message = 'Off-Line';
                status = 'Off-Line';
            }
        } else {
            sucess = (this.isInternet && this.network.type !== 'none');
            type = this.network.type;
            if (sucess) {
                message = 'On-Line';
                status = 'On-Line';
            } else {
                message = 'Off-Line';
                status = 'Off-Line';
            }
        }
        result.push({
            Sucess: sucess,
            Message: message,
            IP: this.IP,
            Type : type,
            Status: status
        });
        resolve(result);
    });
  };

}
