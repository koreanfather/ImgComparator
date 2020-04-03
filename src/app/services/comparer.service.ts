import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComparerService {

  constructor(private http:HttpClient) { }

  reqCompare(form){
    const url = "http://localhost:8080/comp/comp";
    this.http.post<any>(url, form).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
