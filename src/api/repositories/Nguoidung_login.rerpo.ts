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
    public NDlogin = (option: ND): Promise<any> => {
        let query = `SELECT  exists  (SELECT 1 FROM public."nguoi_dung" WHERE "Ten_ND" = '${option.Ten_ND}' AND 
           "Mau_Khau" = '${option.Mau_Khau}' LIMIT 1)  `;
        return this._pgPool.query(query)
            .then(result => {
                console.log(result.rows[0])
                return result.rows[0].exists ? 1 : -1
            })
            .catch(err => {
                console.log(err)
                return null;
            })
    }





}