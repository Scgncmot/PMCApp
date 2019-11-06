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
  selector: 'app-chatlist',
  templateUrl: './chatlist.page.html',
  styleUrls: ['./chatlist.page.scss'],
})
export class ChatlistPage {

  chatslistica = [];

  usuarioId: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public mainService: MainService, private router:Router
  ) {


    this.mainService.getUser().then(usuario => {

      this.usuarioId = usuario.uid;

      this.mainService.getChats().subscribe((chats: Chat[]) => {

        let c =  chats.filter((chat: Chat) => {

          if(chat.usuario.find(x => {return x == this.usuarioId})){

            return chat; 
          }

        })      

       c.forEach((c: Chat) => {

           this.mainService.getUserDataJoin(c, this.usuarioId).forEach(x => {
            
            x.subscribe((el: Usuario) => {

              if(el.uid != this.usuarioId) {

                let obj = {chatob: c, users: el};

                this.chatslistica.push(obj);
              }

              

            });

           })      
        }) 

        console.log(this.chatslistica);

      })

    })
  }

  ngOnInit(): void {

  }


  goToReserva() {

    this.navCtrl.navigateForward('/chat');    

  }



  async createAlert() {

      const alert = await this.alertCtrl.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK']
      });
  }

  getDate(){

    alert("Reserva realizada con éxito");
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}
