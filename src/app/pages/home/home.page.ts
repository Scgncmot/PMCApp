import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController, ToastController, PopoverController, ModalController} from '@ionic/angular';

import { from } from 'rxjs';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {


  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController, 
    public popoverController: PopoverController,
    public alertController: AlertController,
    public modalController: ModalController,
    public toastController: ToastController,
    public mainService: MainService) { }

  ngOnInit() {

  }


  ionViewWillEnter() {

    this.menuCtrl.enable(true);
  }

  


}
