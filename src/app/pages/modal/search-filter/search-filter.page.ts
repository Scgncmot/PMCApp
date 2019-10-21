import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {
  public radiusmiles = 1;


  constructor(private modalCtrl: ModalController, public mainService: MainService) { }

  ngOnInit() {
  }

  closeModal() {
    this.mainService.range= this.radiusmiles;
    this.modalCtrl.dismiss();
  }

}
