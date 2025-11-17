import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rg',
    standalone: false
})
export class RgPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';

    // Remove tudo que não for número
    const digits = value.replace(/\D/g, '');

    // RG geralmente tem entre 7 e 9 dígitos
    if (digits.length < 7 || digits.length > 9) {
      return value; // retorna como está se não bater
    }

    // Formata no padrão: 12.345.678-9
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  }
}