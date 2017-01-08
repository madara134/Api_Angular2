import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { ND } from '../models/Nhom_nguoidung';

export class ND_loginRepo extends RepoBase {

    constructor() {
        super();
    }
    /**
     * InsertOne
     
    public NDlogin(option: ND): Promise<any> {
        let query = `SELECT Mau_Khau FROM public."nguoi_dung" WHERE
            Ten_ND= '${option.Ten_ND}' `;
	                    
        console.log(query)        
        return this._pgPool.query(query)
            .then(result => {
                return console.log(`Get Mat Khau Thanh Cong`)
                //return Promise.resolve
                // return;
            })
            .catch(err => {
                console.log(err)
                return Promise.reject(err)
            })
    }
    */
    public NDlogin = (option: ND): Promise<ND[]> => {
           let query = `SELECT public."nguoi_dung".Mau_Khau FROM public."nguoi_dung" WHERE
            public."nguoi_dung".Ten_ND= '${option.Ten_ND}' `;
        return this._pgPool.query(query)
            .then(result => {
                let NDS: ND[] = result.rows.map(r => {
                    let ct = new ND();
                    ct.ID_ND = r.ID_ND;
                    ct.Ten_ND = r.Ten_ND;
                    ct.Mau_Khau = r.Mau_Khau;
                    ct.Mo_rong=r.Mo_rong;
                    ct.ID_NND=r.ID_NND;                   
                    return ct;
                })
                return NDS;
            })
            .catch(err => {
                console.log(err)
                return null;
            })
    }

    
   

    
}