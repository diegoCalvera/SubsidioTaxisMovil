import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FIRESTORE_TABLES } from 'src/utils/enums/enums';
import { Taxista } from '../model/taxista';
import { Usuario } from '../model/usuario';
import { Taxi } from '../model/taxi';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private taxistasRef: CollectionReference<DocumentData>;
  private usuariosRef: CollectionReference<DocumentData>;
  private taxiRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.taxistasRef = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
    this.usuariosRef = collection(this.firestore, FIRESTORE_TABLES.USUARIO);
    this.taxiRef = collection(this.firestore, FIRESTORE_TABLES.TAXI);
  }

  loginUsuario(usuario: string, contrasena: string): Observable<Usuario[]> {
    const usuarioQuery = query(
      this.usuariosRef,
      where('usuario', '==', usuario),
      where('contrasena', '==', contrasena)
    );

    return collectionData(usuarioQuery, { idField: 'id' }) as Observable<
      Usuario[]
    >;
  }

  getUsuario(campo: string, valor: any): Observable<Usuario[]> {
    const usuario = query(this.usuariosRef, where(campo, '==', valor));
    return collectionData(usuario, { idField: 'id' }) as Observable<Usuario[]>;
  }

  getTaxista(campo: string, valor: any): Observable<Taxista[]> {
    const usuario = query(this.taxistasRef, where(campo, '==', valor));
    return collectionData(usuario, { idField: 'id' }) as Observable<Taxista[]>;
  }

  getTaxi(campo: string, valor: any): Observable<Taxi[]> {
    const usuario = query(this.taxiRef, where(campo, '==', valor));
    return collectionData(usuario, { idField: 'id' }) as Observable<Taxi[]>;
  }

  getAllTaxistas(): Observable<Taxista[]> {
    const taxistas = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
    return collectionData(taxistas) as Observable<Taxista[]>;
  }

  createTaxista(personaBase: Taxista) {
    return setDoc(
      doc(this.firestore, FIRESTORE_TABLES.TAXISTA, personaBase.id),
      personaBase
    );
  }

  updateTaxista(contactoEmergencia: Taxista) {
    const refContactoEmergencia = doc(
      this.firestore,
      FIRESTORE_TABLES.TAXISTA,
      contactoEmergencia.id
    );
    return updateDoc(refContactoEmergencia, {
      ...contactoEmergencia,
    });
  }
}
