import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedBackModalComponent } from 'src/app/core/componets/feed-back-modal/feed-back-modal.component';
import { PatientsService } from 'src/app/services/patients.service';
import { Gender } from 'src/app/shared/enums/gender.enum';
import { IConvenio } from 'src/app/shared/interfaces/convenio.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: false,
})
export class EditComponent implements OnInit {

  public form!: FormGroup;
  public formError: any;
  public isLinear = false;
  public startDate = new Date();
  public id!: number;
  public convenios!: IConvenio[];
  public patient!: any;

  constructor(
    private _formbuilder: FormBuilder,
    private _patientServive: PatientsService,
    private _router: Router,
    public activatedRoute: ActivatedRoute,
    public matDialog: MatDialog
  ) {

  }

  public get F_id(): AbstractControl { return this.form.get('id') as AbstractControl; }
  public get F_email(): AbstractControl { return this.form.get('email') as AbstractControl; }
  public get F_cpf(): AbstractControl { return this.form.get('cpf') as AbstractControl; }
  public get F_rg(): AbstractControl { return this.form.get('rg') as AbstractControl; }
  public get F_uf(): AbstractControl { return this.form.get('uf') as AbstractControl; }
  public get F_gender(): AbstractControl { return this.form.get('gender') as AbstractControl; }
  public get F_name(): AbstractControl { return this.form.get('name') as AbstractControl; }
  public get F_lastName(): AbstractControl { return this.form.get('lastName') as AbstractControl; }
  public get F_birthDate(): AbstractControl { return this.form.get('birthDate') as AbstractControl; }
  public get F_landline(): AbstractControl { return this.form.get('landline') as AbstractControl; }
  public get F_mobile(): AbstractControl { return this.form.get('mobile') as AbstractControl; }
  public get F_insurance(): AbstractControl { return this.form.get('insurance') as AbstractControl; }
  public get F_cardNumber(): AbstractControl { return this.form.get('cardNumber') as AbstractControl; }
  public get F_validity(): AbstractControl { return this.form.get('validity') as AbstractControl; }

  genderOptions = [
    { value: Gender.Masculino, label: 'Masculino' },
    { value: Gender.Feminino, label: 'Feminino' },
    { value: Gender.Outro, label: 'Outro' }
  ];

  estadosBrasil = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' },
  ];


  ngOnInit() {
    this.getConvenios();
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.loadPaciente(this.id);
      }
    });
    this.form = this._formbuilder.group({
      gender: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rg: ['', [Validators.required]],
      cpf: ['', []],
      uf: ['', [Validators.required]],
      birthDate: ['', [Validators.required, this.validateBirthDate]],
      landline: [''],
      mobile: [''],
      insurance: ['', Validators.required],
      cardNumber: ['', Validators.required],
      validity: ['', [Validators.required, this.monthYearValidator]],
    }, { validators: [this.atLeastOnePhoneValidator] });
  }

  public loadPaciente(id: number) {
    this._patientServive.listarPacientePorId(id).subscribe({
      next: (res) => {
        console.log('Paciente carregado para edição:', res);
        this.patient = res;
        this.form.patchValue({
          gender: res.Genero,
          name: res.Nome,
          lastName: res.Sobrenome,
          email: res.Email,
          rg: res.RG,
          cpf: res.CPF,
          uf: res.UF_RG,
          birthDate: res.DataNascimento?.split('T')[0],     // string ISO: "1990-07-31T00:00:00"
          landline: res.TelefoneFixo,
          mobile: res.Celular,
          insurance: res.ConvenioId,
          cardNumber: res.NumeroCarteirinha,
          validity: res.ValidadeCarteirinha?.split('T')[0]
        });

      },
      error: (err) => console.error('Erro ao carregar paciente', err)
    });
  }


  public navigateTo(url: string) {
    this._router.navigateByUrl(url);
  }

  public close(): void {
  }

  public confirm(): void {
    this.updatePatient();
  }

  public updatePatient() {
    const payloadPatient = {
      Genero: this.F_gender.value,
      Nome: this.F_name.value,
      Sobrenome: this.F_lastName.value,
      Email: this.F_email.value,
      Rg: this.F_rg.value,
      CPF: this.F_cpf.value,
      UF_RG: this.F_uf.value,
      DataNascimento: this.F_birthDate.value,
      TelefoneFixo: this.F_landline.value,
      Celular: this.F_mobile.value,
      ConvenioId: this.F_insurance.value,
      NumeroCarteirinha: this.F_cardNumber.value,
      ValidadeCarteirinha: this.F_validity.value,
      IsActive: true,
    }
    console.log('payloadPatient', payloadPatient)
    this._patientServive.atualizarPaciente(this.id, payloadPatient).subscribe({
      next: (res) => {
        this.matDialog.open(FeedBackModalComponent, {
          data: {
            title: 'Sucesso',
            message: 'Paciente atualizado com sucesso!',
            isError: false
          }
        }).afterClosed().subscribe(() => { this._patientServive.listarPacientes(); this.navigateTo('listing'); });
      },
      error: (err) => {
        console.error('Erro ao atualizar paciente', err);

        this.matDialog.open(FeedBackModalComponent, {
          data: {
            title: 'Erro',
            message: 'Não foi possível atualizar o paciente. Tente novamente mais tarde.',
            isError: true
          }
        });
      }
    });

  }

  public getConvenios(): void {
    this._patientServive.listarConvenios().subscribe({
      next: (res: Array<IConvenio>) => {
        if (res && res.length > 0) {
          this.convenios = res;
          this.F_insurance.updateValueAndValidity();
          console.log('convenios recebidos: ', res);
        } else {
          console.warn('Nenhum convênio encontrado.');
        }
      },
      error: (err: any) => {
        // Feedback de erro
        console.error('Erro ao buscar convênios:', err);
        alert('Não foi possível carregar os convênios. Tente novamente mais tarde.')
      }
    })
  }

  public validateBirthDate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const date = new Date(value);
    const today = new Date();

    if (!value || isNaN(date.getTime())) {
      return { invalidDate: true };
    }

    if (date > today) {
      return { invalidDate: true };
    }

    return null;
  }

  public atLeastOnePhoneValidator(group: AbstractControl): ValidationErrors | null {
    const landline = group.get('landline')?.value;
    const mobile = group.get('mobile')?.value;

    const isLandlineValid = landline && (
      /^\d{10}$/.test(landline) || /^\(\d{2}\)\s?\d{4}-\d{4}$/.test(landline)
    );
    const isMobileValid = mobile && (
      /^\d{11}$/.test(mobile) || /^\(\d{2}\)\s?9\d{4}-\d{4}$/.test(mobile)
    );
    if (isLandlineValid || isMobileValid) {
      return null;
    }

    if (landline && !isLandlineValid) {
      group.get('landline')?.setErrors({ invalidPhone: true });
    }
    if (mobile && !isMobileValid) {
      group.get('mobile')?.setErrors({ invalidPhone: true });
    }

    return { atLeastOnePhone: true };
  }


  public monthYearValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    // Se for Date (caso venha de um datepicker)
    if (value instanceof Date) {
      const inputDate = new Date(value.getFullYear(), value.getMonth(), 1);
      const now = new Date();
      const currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
      return inputDate <= currentDate ? { pastDate: true } : null;
    }

    // Se for string (com máscara)
    let trimmed = (value as string).trim();

    // Remove underscores e espaços da máscara
    trimmed = trimmed.replace(/_/g, '').replace(/\s/g, '');

    // Só valida se tiver exatamente 7 caracteres (MM/YYYY)
    if (trimmed.length !== 7) {
      return { invalidDate: true };
    }

    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(trimmed)) {
      return { invalidDate: true };
    }

    const [monthStr, yearStr] = trimmed.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const inputDate = new Date(year, month - 1, 1);
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), 1);

    return inputDate <= currentDate ? { pastDate: true } : null;
  }

  public validityNotInPast(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const selectedDate = new Date(value);
    const now = new Date();

    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const isPast =
      selectedYear < currentYear ||
      (selectedYear === currentYear && selectedMonth < currentMonth);

    return isPast ? { pastDateNotAllowed: true } : null;
  }

  public InsurenceValidationError(): string {
    if (this.F_insurance?.hasError('required')) {
      return this.formError = 'Selecione um convênio.';
    }
    return this.formError = '';
  }
}
