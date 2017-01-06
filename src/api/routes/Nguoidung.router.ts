import { Router, Response, Request } from 'express';

// import các module tạo table
import { NDRepo } from '../repositories/Nguoidung.repo'



export class NDRouter {

    private router: Router; // phải viết
    private NDrepo: NDRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.NDrepo = new NDRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/getAll_Nguoidung')
            .get(this.GetAll)

        this.router.route('/insert_Nguoidung')
            .post(this.InsertND)

        this.router.route('/xoa_Nguoidung')
            .post(this.XoaND)
        return this.router;
    }

    private InsertND = (req: Request, res: Response) => {
        this.NDrepo.InsertND(req.body)
            .then(() => {
                res.status(200).json({ Message: `Thanh Cong` })
                
            })
            .catch((err) => res.sendStatus(400))
    }

    private GetAll = (req: Request, res: Response) => {
        this.NDrepo.GetND()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => res.sendStatus(400))
    }

    private XoaND = (req: Request, res: Response) => {
        this.NDrepo.XoaND(req.body)
            .then(() => res.status(200).send({ Message: `OK` }))
            .catch((err) => res.status(400).json(err))
    }
}