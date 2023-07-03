const { findDeposit } = require('./depositHandler');
const application = require('../util/application');
const { HouseAccount } = require('../model/houseAccount');
const { WithdrawalAccount, withdrawStatus } = require('../model/withrawalAccount');

const calculateFee = (amount) => {
    const factor = 0.01;
    const minimumfee = 5;
    return Math.min(factor * amount, minimumfee);
};
function updateWithdrawAccounts(depositAddress, withdrawAddress, amount, listl) {
    var wAccount = WithdrawalAccount.getAccountByDepositandWithdraw(depositAddress, withdrawAddress);
    if (wAccount) {
        console.log("here");
        if (wAccount.status === withdrawStatus.IN_PROGRESS) {
            let a = parseFloat(wAccount.amount);
            a += amount;
            wAccount.amount = a;
        }
        else {
            return false;
        }

    }
    else {
        wAccount = new WithdrawalAccount(withdrawAddress, amount, depositAddress);
    }
    wAccount.status = withdrawStatus.COMPLETED;
    //wAccount.update();
    ab = WithdrawalAccount.convertToJsonObj(wAccount)
    listl.push(ab);
    return true;
}
function generateRandomInstallments(totalAmount, numAccounts) {
    const installments = [];
    let remainingAmount = totalAmount;
    for (let i = 0; i < numAccounts - 1; i++) {
        const randomAmount = Math.random() * remainingAmount;
        installments.push(randomAmount);
        remainingAmount -= randomAmount;
    }
    installments.push(remainingAmount);
    return installments;
}

const mixerHandler = (depositAddress) => {
    deposit = findDeposit(depositAddress);
    amount = parseFloat(deposit.amount);
    withdrawAddresses = deposit.withdrawalAddress;
    houseAccount = HouseAccount.findHouseAccountByAddress(application.HOUSEADDRESS);
    const fee = calculateFee(amount);
    remainingAmount = amount - fee;
    nAccounts = withdrawAddresses.length;
    installments = generateRandomInstallments(remainingAmount, nAccounts);
    let am = 0.0;
    listAllAccounts = []
    for (let i = 0; i < nAccounts; i++) {
        let state = updateWithdrawAccounts(deposit.depositAddress, withdrawAddresses[i], installments[i], listAllAccounts);
        if (state) {
            am += installments[i];
        }
    }
    if (listAllAccounts.length > 0)
        WithdrawalAccount.writeAll(listAllAccounts);
    if (am > 0.0) {
        houseAccount.amount = parseFloat(houseAccount.amount) - am;
        houseAccount.update();
    }
    return fee;
}
module.exports = { mixerHandler };