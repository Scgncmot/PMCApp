import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { from } from 'rxjs';
// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { MainService } from 'src/app/services/main.service';
import { Chat } from 'src/app/interfaces/chat';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { pluck, map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public mainService: MainService, private router: Router
  ) {}

  ngOnInit() {
  }

  getDate(){

    alert("Reserva realizada con éxito");

    this.navCtrl.navigateForward('/chatlist');    

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}
