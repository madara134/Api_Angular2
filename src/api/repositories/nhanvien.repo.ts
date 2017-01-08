import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { NhanVien } from '../models/nhanvien-model';

export class NhanVienRepo extends RepoBase {

    constructor() {
        super();
    }
    public GetNhanVien(option): Promise<NhanVien[]> {
        let queryText = 'SELECT * FROM public.nhan_vien ORDER BY "ID_Nhan_Vien" ASC';
        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.Ho_Ten])
        } else {
            pResult = this._pgPool.query(queryText)
        }
         return pResult.then(result => {
                let NV: NhanVien[] = result.rows.map(r => {
                    let nv = new NhanVien();
                    nv.id = r.ID_Nhan_Vien;
                    nv.Ho_Ten = r.Ho_Ten;
                    nv.Ngay_Sinh = r.Ngay_Sinh;
                    nv.CMND= r.CMND;
                    nv.Muc_Luong = r.Muc_Luong;
                    nv. Dia_Chi = r. Dia_Chi;
                    nv. ID_DV = r. ID_DV;
                    nv. ID = r. ID;
                    return nv;
                });
                return NV;
            })
            .catch(err => {
                console.log(err.message);
                return null;
            });
    }
     InsertOne(NV: NhanVien): Promise<NhanVien> {
        let queryText = `INSERT INTO public.nhan_vien ("Ho_Ten", "Ngay_Sinh", "CMND", "Muc_Luong", "Dia_Chi", "ID_DV", "ID")
	VALUES ($1, $2, $3, $4, $5, 1,5);`
        console.log('Add api: ' + JSON.stringify(NV))

        return this._pgPool.query(queryText, [NV.Ho_Ten, NV.Ngay_Sinh,NV.CMND,NV.Muc_Luong,NV.Dia_Chi])
            .then(result => NV)
            .catch(error => Promise.reject(error));
    }
    Xoa = (NV?): Promise<any> => {
        let query = `DELETE FROM public.nhan_vien
	                        WHERE "ID" ='${NV.ID}';`
        return this._pgPool.query(query)
            .then(() => { })
            .catch(err => {
                console.log(err)
                Promise.reject(err)
            })
    }
}