import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { LCV } from '../models/nhanvien-model';

export class LCVRepo extends RepoBase {

    constructor() {
        super();
    }
    public GetLCV(option): Promise<LCV[]> {
        let queryText = 'SELECT "ID_CV", "Ten_CV" FROM public.loai_cong_viec';
        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.Ho_Ten])
        } else {
            pResult = this._pgPool.query(queryText)
        }
         return pResult.then(result => {
                let NV: LCV[] = result.rows.map(r => {
                    let nv = new LCV();
                    nv.id = r.ID_CV;
                    nv.Ten_CV = r.Ten_CV;
                    return nv;
                });
                return NV;
            })
            .catch(err => {
                console.log(err.message);
                return null;
            });
    }