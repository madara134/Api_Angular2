import { Router, Response, Request } from 'express';

// import các module tạo table
import { LCVRepo } from '../repositories/loaicongviec.repo'



export class LCVRouter {

    private router: Router; // phải viết
    private nhanvienrepo: LCVRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.nhanvienrepo = new LCVRepo();
    }
    public GetRouter (): Router {
        this.router.route('/LCV')
            .get(this.GetAll)
        return this.router;
    }

     private GetAll = (req: Request, res: Response) => {
        this.nhanvienrepo.GetLCV(null)
            .then(result => {
                 res.status(200).json(result)
            })
            .catch(error =>{
                 console.error(error.message);
                res.status(500).send(error.message)
            })
    }
}