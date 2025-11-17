import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaciente } from '../shared/interfaces/patients.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  // public patients: Array<Patient>;
  private apiUrl = 'http://localhost:5026/api'; // ajuste a porta conforme sua API

  constructor(
    private http: HttpClient,
  ) {
  }
  listarPacientes(): Observable<any[]> {
    return this.http.get<IPaciente[]>(`${this.apiUrl}/pacientes`);
  }

  listarPacientePorId(id: number): Observable<any> {
    return this.http.get<IPaciente>(`${this.apiUrl}/pacientes/${id}`);
  }

  criarPaciente(paciente: IPaciente): Observable<any> {
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
