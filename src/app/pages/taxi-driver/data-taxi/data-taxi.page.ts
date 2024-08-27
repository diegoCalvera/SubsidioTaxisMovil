import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaxistaService } from 'src/app/services/taxista.service';

@Component({
  selector: 'app-data-taxi',
  templateUrl: './data-taxi.page.html',
  styleUrls: ['./data-taxi.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DataTaxiPage implements OnInit {

  taxistaService: TaxistaService = inject(TaxistaService);

  nombreTaxi: string = '';

  ngOnInit() {
    console.log('DataTaxiPage');

    this.taxistaService.datosTaxista().subscribe(e => this.nombreTaxi = e[0].primer_nombre);

  }

}
