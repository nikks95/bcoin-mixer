const path  = require('path');
const {Deposit} = require('../model/deposit');
const {generateDeposit} = require('../handler/depositHandler');

exports.getDepositAddress = (req,res,next) => {
    const adresses = req.body.addresses;
    try{
    const depositAddr = generateDeposit(adresses);    
    resstatus = 200;
    message = depositAddr;
    if(!depositAddr.length>0){
        resstatus = 400;
        messsage = "";
    }
    res.status(resstatus).send({message:message});}
    catch(err){
        res.status(400).send({error:err});
    }
};