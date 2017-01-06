import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { PPC } from '../models/phieu_phan_cong';

export class PPCRepo extends RepoBase {

    constructor() {
        super();
    }
    /**
     * InsertOne
     */
    public InsertOne(option): Promise<any> {
        let query = `INSERT INTO public."phieu_phan_cong"(
	                    "Ngay_bat_dau", "So_ngay", "ID_CV", "ID_Nhan_vien")
	                    VALUES ('${option.Ngay_BD}', '${option.So_ngay}', '${option.ID_CV}',${option.ID_Nhan_vien})`;

        return this._pgPool.query(query)
            .then(result => {
                // return console.log(`Đã Insert`)
                return;
            })
            .catch(err => {
                // return console.log(err)
                return;
            })
    }
    /**
     * GetCongTy
     */
    public Getppc = (option?): Promise<PPC[]> => {
        let query = ` SELECT * FROM public."phieu_phan_cong" `
        return this._pgPool.query(query)
            .then(result => {
                let CTyS: PPC[] = result.rows.map(r => {
                    let ct = new PPC();
                    ct.ID_PC = r.ID;
                    ct.Ngay_bat_dau = r.Ngay_Bat_Dau;
                    ct.So_ngay = r.So_Ngay;
                    ct.ID_CV = r.ID_CV;
                    ct.ID_Nhan_vien = r.ID_Nhan_vien;
                    return ct;
                })
                return CTyS;
            })
            .catch(err => {
                console.log(err)
                return null;
            })
    }

    public XoaPPC = (option?): Promise<any> => {
        let query = `DELETE FROM public."phieu_phan_cong"
	                        WHERE "ID_PC" ='${option.ID_PC}';`
        return this._pgPool.query(query)
            .then(() => { })
            .catch(err => {
                console.log(err)
                Promise.reject(err)
            })
    }
}