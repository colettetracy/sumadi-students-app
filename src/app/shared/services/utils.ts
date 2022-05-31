import * as moment from "moment";
import Swal from "sweetalert2";

export class Utils{

    constructor(){} 

    showMessage(title: any, text: any, icon: any){
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
          })
    }

    dateFormatter(value: any) {
        moment.locale('es');
        return moment(value).format('DD/MM/YYYY');
    };
}