import { Router, Response, Request } from 'express';

// import các module tạo table
import { LogRepo } from '../repositories/log.repo';



export class LogRouter {

    private router: Router; // phải viết
    private logrepo: LogRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.logrepo = new LogRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/user')
            .get(this.GetLogByName)
            .post();
        return this.router;
    }


    private Get(req: Request, res: Response) {
        return res.sendStatus(200)
    }

    private Log = (req: Request, res: Response) => {
        console.log(req.body)
        this.logrepo.InsertOne(req.body)
            .then(reuslt => {
                // console.log(`OK`)
                res.sendStatus(200)
                return
            }).catch(err => {
                // console.log(err)
                res.sendStatus(400)
            }) 
    }

    /**
     * Hàm xử lý lấy log theo Tiêu đề Limit max = 100 offset min = 0;
     * Ngày mặc định là new Date().GetDate()
     */
    private GetLogByName = (req: Request, res: Response) => {
        this.logrepo.GetListbyName()
            .then(result => res.status(200).json(result))
            .catch(err => res.sendStatus(400))
    }
}