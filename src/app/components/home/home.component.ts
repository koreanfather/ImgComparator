import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm,FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { ComparerService } from 'src/app/services/comparer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  responses = false;
  compare1 = 0;
  compare2 = 0;

  myImg = null;
  compImg1 = null;
  compImg2 = null;
  
  destURL = null;

  uploadForm: FormGroup; 

  @ViewChild("f1") imgSubmit:NgForm;

  constructor(private formBuilder: FormBuilder, private comparerer: ComparerService,private http:HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      file2: ['']
    });
  }


  newFile(event){
    if(event.srcElement.id == "myFile"){
      console.log(event);
      this.uploadForm.get('file').setValue(event.target.files[0]);
      this.myImg = event.target.files[0];

    }

    if(event.srcElement.id == "compFile1"){
      console.log(event);
      this.uploadForm.get('file2').setValue(event.target.files[0]);
      this.compImg1 = event.target.files[0];

    }

    if(event.srcElement.id == "compFile2"){
      console.log(event);
      this.compImg2 = event.target.files[0];
    }
  }

  onSubmit(){
    //first compare
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('file2', this.uploadForm.get('file2').value);

    const url = "http://localhost:8080/comp/comp";

    this.http.post<any>(url, formData).subscribe(
      (res) => {
        console.log(res);
        this.compare1 = res;
      },
      (err) => console.log(err)
    );

    this.uploadForm.get('file2').setValue(this.compImg2);
    formData.set('file2', this.uploadForm.get('file2').value);

    this.http.post<any>(url, formData).subscribe(
      (res2) => {
        console.log(res2);
        this.compare2 = res2;
        this.responses = true;
      },
      (err) => console.log(err)

    )
    //this.comparerer.reqCompare(formData);

  }


}
