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

  //variables to upload imgs and also results of comparison
  responses = false;
  compare1 = 0;
  compare2 = 0;
  

  warning = "";
  allowed_types = ['image/png', 'image/jpeg'];
  myImg = null;
  compImg1 = null;
  compImg2 = null;
  
  uploadForm: FormGroup; 


  //form
  @ViewChild("f1") imgSubmit:NgForm;

  constructor(private formBuilder: FormBuilder,private uploadServ: UploadService, private comparerer: ComparerService,private http:HttpClient) { }


  //nginit
  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: "",
      file2: ""
    });
  }

  //Once submitted the files are stored here
  newFile(event){
    if(event.srcElement.id == "myFile"){
      console.log(event);
      this.uploadForm.get('file').setValue(event.target.files[0].name);
      this.myImg = event.target.files[0];

    }

    if(event.srcElement.id == "compFile1"){
      console.log(event);
      this.uploadForm.get('file2').setValue(event.target.files[0].name);
      this.compImg1 = event.target.files[0];

    }

    if(event.srcElement.id == "compFile2"){
      console.log(event);
      this.compImg2 = event.target.files[0];
    }
  }

  //async upload file each one, one at a time
  async uploadFile(){
    let destURL1 = await this.uploadServ.uploadFile(this.myImg.name);
    console.log(destURL1);
    await this.uploadServ.s3Upload(destURL1,this.myImg.type,this.myImg);

    console.log("myImgUp");
    let destURL2 = await this.uploadServ.uploadFile(this.compImg1.name);
    await this.uploadServ.s3Upload(destURL2,this.compImg1.type,this.compImg1);

    console.log("compImg1Up");
    let destURL3 = await this.uploadServ.uploadFile(this.compImg2.name);
    await this.uploadServ.s3Upload(destURL3,this.compImg2.type,this.compImg2);
    console.log("compImg2Up");
    
    return;
  }


  async onSubmit(){
    
    await this.uploadFile()

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('file2', this.uploadForm.get('file2').value);

    this.comparerer.reqCompare(formData).subscribe(
      (res1) => {
        console.log(res1);
        this.compare1 = res1;
      },
      (err)=> console.log(err)
    );


    this.uploadForm.get('file2').setValue(this.compImg2.name);
    formData.set('file2', this.uploadForm.get('file2').value);
    this.comparerer.reqCompare(formData).subscribe(
      (res2) => {
        console.log(res2);
        this.compare2 = res2;
      },
      (err)=> console.log(err)
    );

  }


}
