import { Router, Response, Request } from 'express';

// import các module tạo table
import { ND_loginRepo } from '../repositories/Nguoidung_login.rerpo'



export class ND_loginRouter {

    private router: Router; // phải viết
    private NDlogin: ND_loginRepo;

    constructor() {
        this.router = Router(); // phải viết
        this.NDlogin = new ND_loginRepo();
    }

    /**
     * GetRouter
     */
    public GetRouter(): Router {
        this.router.route('/login')
            .post(this.NDLogin)        
        return this.router;
    }

    private NDLogin = (req: Request, res: Response) => {
        this.NDlogin.NDlogin(req.body)
            .then(result => {
                console.log(result)
                return res.status(200).json(result)
            })
            .catch(err => res.sendStatus(400))
    }

   
}