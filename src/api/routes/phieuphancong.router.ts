import { Router, Response, Request } from 'express';

// import các module tạo table
import { PPCRepo } from '../repositories/phieuphancong.repo'



export class PPCRouter {

    private router: Router; // phải viết
    private PPCrepo: PPCRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.PPCrepo = new PPCRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/getAll_PPC')
            .get(this.GetAll)

        this.router.route('/insert_PPC')
            .post(this.InsertPPC)

        this.router.route('/xoa_PPC')
            .post(this.XoaND)
        return this.router;
    }

    private InsertPPC = (req: Request, res: Response) => {
        this.PPCrepo.InsertOne(req.body)
            .then(() => {
                res.status(200).json({ Message: `Thanh Cong` })
                
            })
            .catch((err) => res.sendStatus(400))
    }

    private GetAll = (req: Request, res: Response) => {
        this.PPCrepo.Getppc()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => res.sendStatus(400))
    }

    private XoaND = (req: Request, res: Response) => {
        this.PPCrepo.XoaPPC(req.body)
            .then(() => res.status(200).send({ Message: `OK` }))
            .catch((err) => res.status(400).json(err))
    }
}