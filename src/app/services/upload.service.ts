import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UploadService {


  constructor(private http: HttpClient) { }

  uploadFile(file){
    const baseURL = "http://localhost:8080/s3/" + file;
    return this.http.get<string>(baseURL).toPromise();
  }

  s3Upload(newURL,fileType,file):Observable<any>{


    const headers = new HttpHeaders({ 'Content-Type': fileType });
    console.log(newURL);
    const req = new HttpRequest('PUT', newURL, file,
      {
        headers: headers,
      });
    return this.http.request(req);

  }
}
