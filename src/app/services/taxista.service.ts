import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Taxista } from '../model/TaxistaDTO';
import { FIRESTORE_TABLES } from 'src/utils/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class TaxistaService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  datosTaxista(): Observable<Taxista[]> {
    const taxistas = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
    return collectionData(taxistas) as Observable<Taxista[]>;
  }

  registrarTaxista(personaBase: Taxista) {
    return setDoc(doc(this.firestore, FIRESTORE_TABLES.TAXISTA, personaBase.id), personaBase);
  }

  actualizarTaxista(contactoEmergencia: Taxista) {
    const refContactoEmergencia = doc(this.firestore, FIRESTORE_TABLES.TAXISTA, contactoEmergencia.id);
    return updateDoc(refContactoEmergencia, {
      ...contactoEmergencia
    });
  }
}
