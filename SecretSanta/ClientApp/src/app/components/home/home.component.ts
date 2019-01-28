import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { HomeService, add } from './home.service';
import { NgForm, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private LoadingSpinnerService: LoadingSpinnerService,
    private HomeService: HomeService,
    private snackBar: MatSnackBar) { }

  persons: any;
  add: add = new add;
  existdata: boolean;
  displayedColumns = ['First Name', 'Last Name', 'Email', 'Group', 'Delete Participant'];
  dataSource = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.getPersons();
    this.getGroups();
  }

  addPerson(f: NgForm) {
    if (f.valid) {
      this.HomeService.addPerson(this.add)
        .subscribe(
          res => {
            if (res) {
              this.snackBar.open("New Participant Added", 'OK', { duration: 500, });
              this.getPersons();
              this.getGroups();
              f.reset();
            }
            else {
              this.snackBar.open("Participant Not Added", 'OK', { duration: 500, });
              f.reset();
            }
          },
        err => {
          console.log(err);
        }
      );
    }
  }
  
  deletePerson(email:string) {
    this.HomeService.deletePerson(email)
      .subscribe(
      res => {
        this.getPersons();
        this.dataSource = new MatTableDataSource(res);
        this.getGroups();
          //this.LoadingSpinnerService.set_progress(false);
        },
        err => {
          console.log("err", err);
          //this.LoadingSpinnerService.set_progress(false);
        }
      );
  }

  getPersons() {
    this.HomeService.getPersons()
      .subscribe(
      res => {
          this.existdata = res.length > 0;
          this.dataSource = new MatTableDataSource(res);
        },
        err => {
          console.log("err", err);
          this.LoadingSpinnerService.set_progress(false);
        }
      );
  }

  getGroups() {
    this.HomeService.getGroups()
      .subscribe(
      res => {
        console.log(res);
        if (res.length == 0) {
          this.options = res;
          this.options.push("Individual");
        }
        else {
          this.options = res;
        }
        
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        },
        err => {
          console.log("err", err);
          this.LoadingSpinnerService.set_progress(false);
        }
      );
  }

}
