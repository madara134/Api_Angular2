import { Router, Response, Request } from 'express';

// import các module tạo table
import { NhanVienRepo } from '../repositories/nhanvien.repo'



export class NhanVienRouter {

    private router: Router; // phải viết
    private nhanvienrepo: NhanVienRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.nhanvienrepo = new NhanVienRepo();
    }
    public GetRouter (): Router {
        this.router.route('/nhanvien')
            .get(this.GetAll)
            .post(this.InsertNV)
            .delete(this.XoaNV)
        return this.router;
    }

     private GetAll = (req: Request, res: Response) => {
        this.nhanvienrepo.GetNhanVien(null)
            .then(result => {
                 res.status(200).json(result)
            })
            .catch(error =>{
                 console.error(error.message);
                res.status(500).send(error.message)
            })
    }
    private InsertNV = (req: Request, res: Response) => {
        this.nhanvienrepo.InsertOne(req.body)
            .then(() => {
                res.status(200).json({ Message: `Thanh Cong` })
            })
            .catch((err) => res.sendStatus(400))
    }
    private XoaNV = (req: Request, res: Response) => {
        this.nhanvienrepo.Xoa(req.body)
            .then(() => res.status(200).send({ Message: `OK` }))
            .catch((err) => res.status(400).json(err))
    }
            
}