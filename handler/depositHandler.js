const {Deposit,depositStatus} = require('../model/deposit');
const { v4: uuidv4 } = require('uuid');

function getDepositByStatus(status) {
    const deposits = Deposit.getAllDeposits();
    const filteredDisposits = deposits.filter((deposit) => deposit.status===status);
    return filteredDisposits;
}
function generateDepositAddress(){
    const newDepositAddress = uuidv4();
    const existingData = Deposit.getAllDeposits();
    const foundAddress = existingData.find(deposit => deposit.depositAddress===newDepositAddress);
    if(foundAddress){
        return generateDepositAddress();
    } 
    else{
        return newDepositAddress;
    }
}
function findDeposit(address){
    const existingData = Deposit.getAllDeposits();
    deposit = existingData.find(de => de.depositAddress===address);
    if(deposit){
        return deposit;
    }
    else{
        return null;
    }
}
function generateDeposit(withdrawalAddress){
    deposit = new Deposit(generateDepositAddress(),withdrawalAddress,0.0,depositStatus.CREATED);
    deposit.withdrawalAddress = withdrawalAddress;
    deposit.save();
    return deposit.depositAddress;
};  
module.exports = {generateDeposit,findDeposit,getDepositByStatus};
