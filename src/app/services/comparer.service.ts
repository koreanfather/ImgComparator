import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComparerService {

  constructor(private http:HttpClient) { }

  reqCompare(form){
    //const url = "http://localhost:8080/comp/comp"
    const url = "http://ec2-3-132-216-55.us-east-2.compute.amazonaws.com:8080/comp/comp";
    return this.http.post<any>(url, form);
  }
}
