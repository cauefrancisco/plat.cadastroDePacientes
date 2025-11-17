import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';
import { Gender } from 'src/app/shared/enums/gender.enum';
import { IPaciente } from 'src/app/shared/interfaces/patients.interface';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'Nome',
    'Sobrenome',
    'DataNascimento',
    'Genero',
    'CPF',
    'RG',
    'UF_RG',
    'Email',
    'Celular',
    'TelefoneFixo',
    'ConvenioNome',
    'NumeroCarteirinha',
    'ValidadeCarteirinha',
    'actions'
  ];

  public pacientes!: Array<IPaciente>
  dataSource = new MatTableDataSource(this.pacientes);

  public genderOptions = [
    { value: Gender.Masculino, label: 'Masculino' },
    { value: Gender.Feminino, label: 'Feminino' },
    { value: Gender.Outro, label: 'Outro' }
  ];


  constructor(
    private _router: Router,
    private patientService: PatientsService,

  ) { }

  ngOnInit() {
    this.getPatientsListing();
    this.patientService.listarConvenios().subscribe((res) => { console.log('convenios: ', res) });
  }

  public returnGenderLabel(genderEnum: number): string {
    const findLabel = this.genderOptions.find((item) => item.value === genderEnum);
    return findLabel?.label || '-';
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarPaciente(paciente: any) {
    // Aqui você pode navegar para a tela de edição ou abrir um modal
    console.log('Editar paciente:', paciente);
    // Exemplo com router:
    // this.router.navigate(['/pacientes/editar', paciente.id]);
  }

  public navigateTo(url: string) {
    this._router.navigateByUrl(url);
  }

  public getPatientsListing(): void {
    this.patientService.listarPacientes().subscribe((res) => {
      this.pacientes = res;
    })
  }

}
