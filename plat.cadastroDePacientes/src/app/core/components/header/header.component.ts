import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/pages/register/register.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class HeaderComponent implements OnInit {

  constructor(
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public addNewPatient() {
    this.matDialog.open(RegisterComponent).afterClosed().subscribe((res: any) => console.log("res modal", res));
  }
}
