import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feed-back-modal',
  templateUrl: './feed-back-modal.component.html',
  styleUrls: ['./feed-back-modal.component.scss'],
  standalone: false
})
export class FeedBackModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FeedBackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; isError: boolean },
  ) { }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

}
