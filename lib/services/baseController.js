

export default BaseController{

    constructor(service){
        this._service=service;
    }

    async index(req, res){
        try{
            let data=await this._service.loadMany();
            res.send(data);
        }catch(err){
            res.status(401).send(e);
        }
    }   

    async show(req, res){
        try{
            let id = req.params.id;
            let data=await this._service.loadOne({_id:id});
            res.send(data);
        }catch(err){
            res.status(401).send(e);
        }
    }   

    async create(req, res){
        try{
            let data=await this._service.save(req.body);
            res.send(data);
        }catch(err){
            res.status(401).send(e);
        }

    }   

    async update(req, res){
        try{
            let data=await this._service.save(req.body,req.id);
            res.send(data);
        }catch(err){
            res.status(401).send(e);
        }

    }   

    async destroy(req, res){
        try{
            let data=await this._service.delete(req.id);
            res.send(data);
        }catch(err){
            res.status(401).send(e);
        }
    }   

}


