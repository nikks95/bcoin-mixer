const {findDeposit} = require('../handler/depositHandler')
const {transactionHandler,houseAccountTransferHandler} = require('../handler/transactionHandler');
const {mixerHandler} = require('../handler/mixerHandler');

const transactionController = (req,res,next) =>{
    const {toAddress, fromAddress, amount} = req.body;
    deposit = findDeposit(toAddress);
    if(deposit){
        const {state, message} = transactionHandler(deposit,toAddress,fromAddress,amount);
        if(state===false){

        }
        else{
            res.status(200).send({message:"success"});
        }
    }   
    else {
        res.status(400).send({message:"No Such deposit account found"});
    }
}
const houseAccountTransferController = (req,res,next) => {
    houseAccountTransferHandler();
    res.status(200).send({message:"success"});
}

const mixerController = (req,res,next) => {
    const {depositAddress} = req.body;
    //try{
    const fee = mixerHandler(depositAddress);
    res.status(200).send({message:"Collected fee: "+fee});    
    //}
    //catch(err){
    //    res.status(400).send({message:err+"Custom message"});
    //}
}
module.exports = {transactionController,houseAccountTransferController,mixerController};