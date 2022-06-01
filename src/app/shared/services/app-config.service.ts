import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppsettings } from 'src/app/models/config-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  settings: IAppsettings;

  constructor(private http: HttpClient) {

  }
  loadconfig() {
    let url = `assets/config/config.${environment.envName}.json`
    return this.http.get<IAppsettings>(url)
      .toPromise()
      .then(result => {
        this.settings = result;
      });
  }
}
