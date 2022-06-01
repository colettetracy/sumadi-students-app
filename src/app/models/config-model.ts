export interface IAppsettings {
    title: string;
    envName: string;
    apis: {
      urlApi: string,
      baseUrl:string,
    };
  }
  export class AppSettings implements IAppsettings {
    apis: { urlApi: string; baseUrl: string; };
    title!: string;
    envName!: string;
    
  
  }