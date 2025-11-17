import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';
import { Gender } from 'src/app/shared/enums/gender.enum';
import { IPaciente } from 'src/app/shared/interfaces/patients.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public formError: any;
  public isLinear = false;
  public startDate = new Date();


  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formbuilder: FormBuilder,
    private _patientServive: PatientsService,
    private _router: Router,
  ) {
    this.form = this._formbuilder.group({
      id: [],
      gender: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      rg: [null, [Validators.required]],
      cpf: [null, []],
      uf: [null, [Validators.required]],
      birthDate: ['', [Validators.required, this.validateBirthDate]],
      landline: [''],
      mobile: [''],
      insurance: ['', Validators.required],
      cardNumber: ['', Validators.required],
      validity: ['', [Validators.required, this.monthYearValidator]],
    }, { validators: [this.atLeastOnePhoneValidator] });
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

  convenios = [
    { id: 1, nome: 'Unimed' },
    { id: 2, nome: 'Bradesco Saúde' },
    { id: 3, nome: 'Amil' },
  ];

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

    // já existe o this.form criado no construtor
    this.form.get('validity')?.valueChanges.subscribe(value => {
      console.log('Valor digitado em validity:', value);
    });

  }



  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm() {
    this.submitNewPatient();
    this._router.navigateByUrl('listing');
    this.dialogRef.close(true);
  }

  validateBirthDate(control: AbstractControl) {
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

  atLeastOnePhoneValidator(group: AbstractControl): ValidationErrors | null {
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


  monthYearValidator(control: AbstractControl): ValidationErrors | null {
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

  validityNotInPast(control: AbstractControl): ValidationErrors | null {
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

  public submitNewPatient() {
    const payloadPatient = {
      genero: this.F_gender.value,
      nome: this.F_name.value,
      sobrenome: this.F_lastName.value,
      email: this.F_email.value,
      rg: this.F_rg.value,
      cpf: this.F_cpf.value,
      uf_RG: this.F_uf.value,
      dataNascimento: this.F_birthDate.value,
      telefoneFixo: this.F_landline.value,
      celular: this.F_mobile.value,
      convenioId: this.F_insurance.value,
      numeroCarteirinha: this.F_cardNumber.value,
      validadeCarteirinha: this.F_validity.value,
    } as IPaciente
    console.log('payloadPatient: ', payloadPatient)
    // this._patientServive.createPatient(payloadPatient);
    this._patientServive.criarPaciente(payloadPatient).subscribe((res) => {
      if (res) {
        console.log('res', res);
      }
    });
  }

}
