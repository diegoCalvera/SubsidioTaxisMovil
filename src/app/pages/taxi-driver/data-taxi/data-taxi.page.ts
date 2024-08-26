import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-data-taxi',
  templateUrl: './data-taxi.page.html',
  styleUrls: ['./data-taxi.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DataTaxiPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
