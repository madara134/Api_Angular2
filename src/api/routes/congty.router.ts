import { Router, Response, Request } from 'express';

// import các module tạo table
import { CongTyRepo } from '../repositories/congty.repo'



export class CongTyRouter {

    private router: Router; // phải viết
    private congtyrepo: CongTyRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.congtyrepo = new CongTyRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/congty')
            .get(this.GetAll)
            .post(this.InsertNV)
        this.router.route('/xoact')
            .post(this.XoaNV)
        return this.router;
    }

    private InsertNV = (req: Request, res: Response) => {
        this.congtyrepo.InsertOne(req.body)
            .then(() => {
                res.status(200).json({ Message: `Thanh Cong` })
            })
            .catch((err) => res.sendStatus(400))
    }

    private GetAll = (req: Request, res: Response) => {
        this.congtyrepo.GetCongTy()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => res.sendStatus(400))
    }

    private XoaNV = (req: Request, res: Response) => {
        this.congtyrepo.XoaCongTy(req.body)
            .then(() => res.status(200).send({ Message: `OK` }))
            .catch((err) => res.status(400).json(err))
    }
}