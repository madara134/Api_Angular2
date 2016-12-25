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

    public GetListbyName(option?): Promise<User[]> {
        //Hello
        let query = ` SELECT * FROM public."User" `

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