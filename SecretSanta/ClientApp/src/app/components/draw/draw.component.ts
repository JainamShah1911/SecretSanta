import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { NgForm, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DrawService } from './draw.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  constructor(private LoadingSpinnerService: LoadingSpinnerService,
    private DrawService: DrawService,
    private snackBar: MatSnackBar) { }

  persons: any;
  existdata: boolean
  displayedColumns = ['Santa Name', 'Santa Email', 'Santa Group','Arrow', 'Reciepent Name', 'Reciepent Email', 'Reciepent Group'];
  dataSource = new MatTableDataSource([]);

  ngOnInit() {
  }


  draw() {
    this.DrawService.draw()
      .subscribe(
      res => {
        this.existdata = res.length>0;
          this.dataSource = new MatTableDataSource(res);
        },
        err => {
          console.log("err", err);
        }
    );
    
  }
}
