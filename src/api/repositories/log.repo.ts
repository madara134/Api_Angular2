import { RepoBase } from './repositories.base';
import { Pool, QueryResult } from 'pg';
import { User } from '../models/log-model'

export class LogRepo extends RepoBase {
    constructor() {
        super();
    }
    /**
     * InsertOne
     */
    public InsertOne(option): Promise<any> {
        let query = `INSERT INTO public."User"("IDUser","TaiKhoan", "Password")
	                VALUES (${4},'${option.TaiKhoan}', '${option.Password}')`;
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

<<<<<<< HEAD
    public GetListbyName(option?): Promise<User[]> {
        //Hello
        let query = ` SELECT * FROM public."User" `

=======
    public GetListbyName(option): Promise<any> {
        //hello Thanh
        let limit = option.limit ? option.limit : 100;
        let offset = option.offset ? option.offset : 0;
        let date = option.NgayTao ? option.NgayTao : new Date().getDate()
        let TieuDeLog = option.TieuDeLog ? option.TieuDeLog : null
        let query = ` SELECT *
                        FROM public."Log"
                        WHERE  lower("TieuDeLog") like lower('%${TieuDeLog}%') AND date_part('day', public."Log"."NgayTao") = ${date}
                        Limit ${limit} offset ${offset}`
>>>>>>> nghia-f-themnv
        return this._pgPool.query(query)
            .then(result => {
                let users: User[] = result.rows.map(x => {
                    let user: User = new User();
                    user.TaiKhoan = x.TaiKhoan;
                    user.Password = x.Password;
                    return user;
                })
                return users;
            })
            .catch(err => console.log(err))
    }
}