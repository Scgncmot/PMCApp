import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  deportes=[{
      nombre: 'Squash',
      imagen:'https://cdn3.iconfinder.com/data/icons/common-sports/4096/squash-512.png',
      isChecked: false,
      descripcion:'sadasdsfadsfadsfasdfsdfadsfasdfsfsfs'
    },
    {
      nombre: 'League of legends',
      imagen:'https://icon-library.net/images/league-of-legends-free-icon/league-of-legends-free-icon-13.jpg',
      isChecked: false,
      descripcion:'sadasdsfadsfadsfasdfsdfadsfasdfsfsfs'
    },
    {
      nombre: 'Futbol',
      imagen:'https://cdn3.iconfinder.com/data/icons/activity-starter-add-on-vol-1/48/v-01-512.png',
      isChecked: false,
      descripcion:'sadasdsfadsfadsfasdfsdfadsfasdfsfsfs'
    },
    {
      nombre: 'Natacion',
      imagen:'https://image.flaticon.com/icons/svg/67/67037.svg',
      isChecked: false,
      descripcion:'sadasdsfadsfadsfasdfsdfadsfasdfsfsfs'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
