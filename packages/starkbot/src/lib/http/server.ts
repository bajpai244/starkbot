import express from 'express';

export class StarkBotServer {
    port: number;
    app: express.Express;

    constructor(port: number)  {
        this.port = port;
        this.app = express();
    }

    private registerMiddleWares() {
        this.app.use(express.json());
    }

    private registerRoutes() {
        this.app.get('/', (req, res) => {
            res.send('hello from the starkland!');
        });

        this.app.post('/notification', (req, res)=> {
            console.log(req.body);
        });
    }

    start () {
        this.registerMiddleWares();
        this.registerRoutes();

        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }
}
