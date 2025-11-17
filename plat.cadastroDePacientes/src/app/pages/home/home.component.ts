import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public matDialog: MatDialog,
    private _router: Router,
  ) { }

  ngOnInit() {
  }


  public addNewPatient() {
    this.matDialog.open(RegisterComponent).afterClosed().subscribe((res: any) => console.log("res modal", res));
  }

  public navigateTo(url: string) {
    this._router.navigateByUrl(url);
  }

}
