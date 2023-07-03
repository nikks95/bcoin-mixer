const application = require('../util/application');
const fileHandler = require('../handler/fileHandler');
const cpath = require('../util/customPath');
const withdrawStatus = {
    NOT_DEFINED: -1,
    IN_PROGRESS: 0,
    COMPLETED: 1
};
class WithdrawalAccount {
    withdrawalAddress = "";
    amount = 0.0;
    depositAddress = 0.0;
    status = withdrawStatus.NOT_DEFINED;

    constructor(withdrawalAddress, amount, depositAddress) {
        this.amount = amount;
        this.withdrawalAddress = withdrawalAddress;
        this.depositAddress = depositAddress;
        this.status = withdrawStatus.IN_PROGRESS;
    }
    isSame(obj) {
        return (obj.withdrawalAddress === this.withdrawalAddress && obj.depositAddress == this.depositAddress);
    }
    static getAllAccounts = () => {
        const existingData = fileHandler.readInputFile(cpath(application.WITHDRAWFILE));
        console.log("Read: " + existingData);
        const withdrawAccounts = existingData.map((data) => new WithdrawalAccount(data.withdrawalAddress, data.amount, data.depositAddress, data.status));
        return withdrawAccounts;
    }
    static convertToJsonObj = (d) => {
        const m = {
            withdrawalAddress: d.withdrawalAddress,
            amount: d.amount,
            depositAddress: d.depositAddress,
            status: d.status
        };
        return m;
    };
    static getAccountByDepositandWithdraw = (dAddr, wAddr) => {
        const existingData = fileHandler.readInputFile(cpath(application.WITHDRAWFILE)).find((account) => account.withdrawalAddress === wAddr && account.depositAddress === dAddr);
        return existingData;

    }
    save = () => {
        const withdrawAccounts = WithdrawalAccount.getAllAccounts();
        withdrawAccounts.push(WithdrawalAccount.convertToJsonObj(this));
        const updatedData = withdrawAccounts.map((d) => ({
            withdrawalAddress: d.withdrawalAddress,
            amount: d.amount,
            depositAddress: d.depositAddress,
            status: d.status
        }));
        fileHandler.writeOutpuFile(cpath(application.WITHDRAWFILE), updatedData);
    };
    static writeAll = (objs) => {
        console.log(objs);
        //console.log("Write: " + updatedData);
        fileHandler.writeOutpuFile(cpath(application.WITHDRAWFILE), objs);
    };
    update = () => {
        const withdrawAccounts = WithdrawalAccount.getAllAccounts();
        const filteredAccounts = withdrawAccounts.filter((account) => account.isSame(this) === false);
        filteredAccounts.push(WithdrawalAccount.convertToJsonObj(this));
        const updatedData = filteredAccounts.map((d) => ({
            withdrawalAddress: d.withdrawalAddress,
            amount: d.amount,
            depositAddress: d.depositAddress,
            status: d.status
        }));
        console.log("Write: " + updatedData);
        fileHandler.writeOutpuFile(cpath(application.WITHDRAWFILE), updatedData);

    };
}

module.exports = { WithdrawalAccount, withdrawStatus };