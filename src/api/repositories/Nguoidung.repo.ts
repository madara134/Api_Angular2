import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { ND } from '../models/Nhom_nguoidung';

export class NDRepo extends RepoBase {

    constructor() {
        super();
    }
    /**
     * InsertOne
     */
    public InsertND(option: ND): Promise<any> {
        let query = `INSERT INTO public."nguoi_dung"(
	                    "Ten_ND", "Mau_Khau", "Mo_rong", "ID_NND")
	                    VALUES ('${option.Ten_ND}', ${option.Mau_Khau}, '${option.Mo_rong}', '${option.ID_NND}')`;

        return this._pgPool.query(query)
            .then(result => {
                return console.log(`Đã Insert`)
                //return Promise.resolve
                // return;
            })
            .catch(err => {
                return Promise.reject(err)
            })
    }
    /**
     * GetNND
     */
    public GetND = (): Promise<ND[]> => {
        let query = ` SELECT * FROM public."nguoi_dung" `
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

    //XoaNND
    public XoaND = (option?): Promise<any> => {
        let query = `DELETE FROM public."nguoi_dung"
	                        WHERE "ID_ND" ='${option.ID_ND}';`
        return this._pgPool.query(query)
            .then(() => { })
            .catch(err => {
                console.log(err)
                Promise.reject(err)
            })
    }
}