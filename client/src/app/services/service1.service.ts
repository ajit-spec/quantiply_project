import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  API_URL = 'http://localhost:8080'

  constructor(
    public http: HttpClient
  ) {
  }

  get_curr_date = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`
  }

  get_data(date?: any): Observable<any> {

    if (!date) {
      date = this.get_curr_date()
    }

    return this.http.get(
      `${this.API_URL}/get_data?date=${date}`
    )
  }

}
