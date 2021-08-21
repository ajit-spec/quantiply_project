import {Component, OnInit} from '@angular/core';
import {Service1Service} from "./services/service1.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public service1: Service1Service,
    public ngxspinnerservice: NgxSpinnerService
  ) {
  }

  curr_date = this.service1.get_curr_date()
  sel_date = this.curr_date
  data: any;

  ngOnInit() {
    this.get_data()
  }

  get_data(date?: any): void {
    this.ngxspinnerservice.show()
    this.service1.get_data(date).subscribe(value => {
      console.log(value)
      if (value.status === 1) {
        this.data = value.data
        this.ngxspinnerservice.hide()
      }
    })
  }

  change_date(ev: any): void {
    console.log(ev)
    const date = ev.target.value
    this.get_data(date)
  }


}
