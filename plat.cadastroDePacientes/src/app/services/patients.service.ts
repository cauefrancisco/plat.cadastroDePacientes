import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaciente } from '../shared/interfaces/patients.interface';
import { Patient } from '../shared/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  public patients: Array<Patient>;
  private apiUrl = 'http://localhost:5026/api'; // ajuste a porta conforme sua API

  constructor(
    private http: HttpClient,
  ) {
    this.patients = [
      {
        id: 1,
        name: 'Ana',
        lastName: 'Silva',
        birthDate: new Date(1990, 4, 15).toISOString(),
        gender: 2,
        cpf: '12345678900',
        rg: '123456789',
        uf: 'SP',
        email: 'ana.silva@email.com',
        mobile: '11912345678',
        landline: '1112345678',
        insurance: 'Unimed',
        cardNumber: 'UN123456',
        validity: '11/2029',
      },
    ];
  }



  public createPatient(Patient: Patient) {
    // this.patients.id = this._afs.createId();
    this.patients.push(Patient);
  }

  public getPatients() {
    return this.patients;
  }

  // public getObjectById(id: string): Observable<any> {
  //   return this._afs.collection('posts').doc(id).valueChanges();
  // }

  // public deletePost(id: string) {
  //   return this._afs.collection('posts').doc(id).delete();
  // }

  // public updatePost(id: string, payload: IPostSample) {
  //   return this._afs.collection('posts').doc(id).update(payload);
  // }

  listarPacientes(): Observable<IPaciente[]> {
    return this.http.get<IPaciente[]>(`${this.apiUrl}/pacientes`);
  }

  criarPaciente(paciente: IPaciente): Observable<IPaciente> {
    return this.http.post<IPaciente>(`${this.apiUrl}/pacientes`, paciente);
  }

  atualizarPaciente(id: number, paciente: IPaciente): Observable<IPaciente> {
    return this.http.put<IPaciente>(`${this.apiUrl}/pacientes/${id}`, paciente);
  }

  desativarPaciente(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/pacientes/${id}/desativar`, {});
  }

  listarConvenios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/convenios`);
  }


}
