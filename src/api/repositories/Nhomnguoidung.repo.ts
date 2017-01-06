import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { NND } from '../models/Nhom_nguoidung';

export class NNDRepo extends RepoBase {

    constructor() {
        super();
    }
    /**
     * InsertOne
     */
    public InsertNND(option: NND): Promise<any> {
        let query = `INSERT INTO public."nhom_nguoi_dung"(
	                    "Ten_NND", "Ma_So")
	                    VALUES ('${option.Ten_NND}', ${option.Ma_So})`;

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
    public GetNND = (): Promise<NND[]> => {
        let query = ` SELECT * FROM public."nhom_nguoi_dung" `
        return this._pgPool.query(query)
            .then(result => {
                let NNDS: NND[] = result.rows.map(r => {
                    let ct = new NND();
                    ct.ID_NND = r.ID_NND;
                    ct.Ma_So = r.Ma_So;
                    ct.Ten_NND = r.Ten_NND;                   
                    return ct;
                })
                return NNDS;
            })
            .catch(err => {
                console.log(err)
                return null;
            })
    }

    //XoaNND
    public XoaNND = (option?): Promise<any> => {
        let query = `DELETE FROM public."nhom_nguoi_dung"
	                        WHERE "ID_NND" ='${option.ID_NND}';`
        return this._pgPool.query(query)
            .then(() => { })
            .catch(err => {
                console.log(err)
                Promise.reject(err)
            })
    }
}