import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { CongTy } from '../models/log-model';

export class CongTyRepo extends RepoBase {

    constructor() {
        super();
    }
    /**
     * InsertOne
     */
    public InsertOne(option): Promise<any> {
        let query = `INSERT INTO public."cong_ty"(
	                    "Ten", "Dien_Thoai", "Dia_Chi", "Tuoi_Toi_Thieu", "Tuoi_Toi_Da")
	                    VALUES ('${option.HoTen}', '${option.SDT}', '${option.DC}','${option.TuoiMax}','${option.TuoiMin}')`;
        console.log(query)
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
    public GetCongTy = (option?): Promise<CongTy[]> => {
        let query = ` SELECT * FROM public."cong_ty" `
        return this._pgPool.query(query)
            .then(result => {
                let CTyS: CongTy[] = result.rows.map(r => {
                    let ct = new CongTy();
                    ct.id = r.ID;
                    ct.Ten = r.Ten;
                    ct.Dia_Chi = r.Dia_Chi;
                    ct.Dien_Thoai = r.Dien_Thoai;
                    ct.Tuoi_Toi_Da = r.Tuoi_Toi_Da;
                    ct.Tuoi_Toi_Thieu = r.Tuoi_Toi_Thieu;
                    return ct;
                })
                return CTyS;
            })
            .catch(err => {
                console.log(err)
                return null;
            })
    }
}