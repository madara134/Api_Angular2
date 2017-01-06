import { Router, Response, Request } from 'express';

// import các module tạo table
import { NNDRepo } from '../repositories/nhomnguoidung.repo'



export class NNDRouter {

    private router: Router; // phải viết
    private NNDrepo: NNDRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.NNDrepo = new NNDRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/getAll_Nhomnguoidung')
            .get(this.GetAll)

        this.router.route('/insert_Nhomnguoidung')
            .post(this.InsertNND)

        this.router.route('/xoa_Nhomnguoidung')
            .post(this.XoaNND)
        return this.router;
    }

    private InsertNND = (req: Request, res: Response) => {
        this.NNDrepo.InsertNND(req.body)
            .then(() => {
                res.status(200).json({ Message: `Thanh Cong` })
                
            })
            .catch((err) => res.sendStatus(400))
    }

    private GetAll = (req: Request, res: Response) => {
        this.NNDrepo.GetNND()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => res.sendStatus(400))
    }

    private XoaNND = (req: Request, res: Response) => {
        this.NNDrepo.XoaNND(req.body)
            .then(() => res.status(200).send({ Message: `OK` }))
            .catch((err) => res.status(400).json(err))
    }
}