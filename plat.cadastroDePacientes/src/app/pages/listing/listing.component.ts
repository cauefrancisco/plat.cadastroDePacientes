import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';
import { Gender } from 'src/app/shared/enums/gender.enum';
import { IPaciente } from 'src/app/shared/interfaces/patients.interface';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  standalone: false
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
    private _patientService: PatientsService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getPatientsListing();
  }

  public returnGenderLabel(genderEnum: number): string {
    const findLabel = this.genderOptions.find((item) => item.value === genderEnum);
    return findLabel?.label || '-';
  }


  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public editPatient(paciente: IPaciente) {
    console.log('Editar paciente:', paciente);
    if (paciente.Id) {
      this.getPatientById(paciente.Id);
      this.matDialog.open(RegisterComponent, { data: paciente })
      // Exemplo com router:
      // this.router.navigate(['/pacientes/editar', paciente.id]);
    }
  }

  public getPatientById(id: number) {
    this._patientService.listarPacientePorId(id).subscribe({
      next: (res) => {
        if (res) {
          console.log('paciente buscado: ', res);

          // Navega para a rota de edição
          this._router.navigate(['/edit', res.Id]);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar paciente', err);
      }
    });
  }

  public navigateTo(url: string) {
    this._router.navigateByUrl(url);
  }

  public getPatientsListing(): void {
    this._patientService.listarPacientes().subscribe((res) => {
      this.pacientes = res;
    })
  }

}
