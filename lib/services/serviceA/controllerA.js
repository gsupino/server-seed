import {serviceA} from './serviceA';

export async function index(req, res){
    //res.send('ciao');
    
    try{
        let data=await serviceA.loadMany();
        res.send(data);
    }catch(err){
        res.sendStatus(401);
    }
    
}

export async function show(req, res){
    try{
        let id = req.params.id;
        let data=await serviceA.loadOne(id);
        res.send(data);
    }catch(err){
        res.sendStatus(401);
    }
}   

export async function create(req, res){
    try{
        console.log(req.body)
        let data=await serviceA.save(req.body);
        res.send(data);
    }catch(err){
        res.sendStatus(401);
    }

}   

export async function update(req, res){
    try{
        let data=await serviceA.save(req.body,req.id);
        res.send(data);
    }catch(err){
        res.sendStatus(401);
    }

}   

export async function destroy(req, res){
    try{
        let data=await serviceA.delete(req.params.id);
        console.log(data)
        res.send(data);
    }catch(err){
        res.sendStatus(401);
    }
}   
