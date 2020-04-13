import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UploadService {


  constructor(private http: HttpClient) { }


  //getting presigned url
  uploadFile(file){
    const baseURL = "http://ec2-3-132-216-55.us-east-2.compute.amazonaws.com:8080/s3/s3/" + file;
    //const baseURL = "http://localhost:8090/s3/" + file;
    return this.http.get<string>(baseURL).toPromise();
  }

  //uploading to s3
  s3Upload(newURL,fileType,file){
    const headers = new HttpHeaders({ 'Content-Type': fileType });
    const req = new HttpRequest('PUT', newURL, file,
      {
        headers: headers,
      });
    return this.http.request(req).toPromise();

  }
}
