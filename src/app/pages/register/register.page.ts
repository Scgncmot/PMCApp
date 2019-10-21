import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  sportOptions=[{
      nombre: 'Squash',
      imagen:'https://cdn3.iconfinder.com/data/icons/common-sports/4096/squash-512.png',
      isChecked: false
    },
    {
      nombre: 'League of legends',
      imagen:'https://icon-library.net/images/league-of-legends-free-icon/league-of-legends-free-icon-13.jpg',
      isChecked: false
    },
    {
      nombre: 'Futbol',
      imagen:'https://cdn3.iconfinder.com/data/icons/activity-starter-add-on-vol-1/48/v-01-512.png',
      isChecked: false
    },
    {
      nombre: 'Natacion',
      imagen:'https://image.flaticon.com/icons/svg/67/67037.svg',
      isChecked: false
    }
  ];
  usuario={
    imagen: "https://e3.365dm.com/17/03/768x432/f4ffaee815e1ab68cd8bc65e34a2ff3279492ae302b43175ae947040584cabd3_3920762.jpg?bypass-service-worker&20170331215749",
    nombre:"",
    email:"",
    password:"",
    deportes:[],
    username:''
  }
  
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public maninService: MainService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    
    console.log(this.sportOptions);
    
  }

  async signUp() {
    this.sportOptions.map(deporte=>{
      if(deporte.isChecked)
        this.usuario.deportes.push(deporte.nombre)
    })
    this.maninService.register(this.usuario.email, this.usuario.password).then(x=>{
        this.maninService.crearUsuario(this.usuario, x.user.uid).then(x=>{
            this.navCtrl.navigateRoot('/home-results')
        })
    })
    
    
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
