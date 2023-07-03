const { findDeposit,getDepositByStatus } = require('./depositHandler')
const { depositStatus } = require('../model/deposit');
const { HouseAccount } = require('../model/houseAccount');
const app = require('../util/application');
const transactionHandler = (deposit, toAddr, fromAddr, amount) => {
    try {
        currentAmount = parseFloat(deposit.amount);
        newAmount = currentAmount + amount;
        deposit.amount = newAmount;
        deposit.status = depositStatus.TRANSFERRED;
        deposit.update();
    }
    catch (err) {
        return { state: false, message: err };
    }
    return { state: true, message: "success" };
}
const calculateTotalAmount  = (deposits)=> {
    amount = 0.0;
    deposits.forEach(deposit => {
        amount+=parseFloat(deposit.amount);
    });
    return amount;
}
const houseAccountTransferHandler = () => {
    HouseAccount.initHouseAccount();
    const deposits = getDepositByStatus(depositStatus.TRANSFERRED);
    totalAmount = calculateTotalAmount(deposits);
    houseAccount  = HouseAccount.findHouseAccountByAddress(app.HOUSEADDRESS);
    houseAccount.amount = parseFloat(houseAccount.amount) + totalAmount;
    houseAccount.update();
    deposits.forEach( deposit => {
        deposit.status = depositStatus.MOVE_TO_HOUSE;
        deposit.update();
    });

}
module.exports = { transactionHandler,houseAccountTransferHandler };