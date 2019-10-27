import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  usuariosMatcheados = [];
  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public mainService: MainService
  ) {
    this.appPages = [
      {
        title: 'Inicio',
        url: '/home',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Sports',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle'
      },
      {
        title: 'Matches',
        url: '/settings',
        direct: 'forward',
        icon: 'chatboxes'
      },
      {
        title: 'Chats',
        url: '/chatlist',
        direct: 'forward',
        icon: 'chatboxes'
      }
    ];

    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.mainService.signOut();
    this.navCtrl.navigateRoot('/');
  }


}
