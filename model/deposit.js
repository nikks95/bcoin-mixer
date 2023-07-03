const application = require('../util/application');
const fileHandler = require('../handler/fileHandler');
const cpath = require('../util/customPath');
const depositStatus = {
    NOT_DEFINED: -1,
    CREATED: 0,
    TRANSFERRED: 1,
    MOVE_TO_HOUSE: 2
};
class Deposit {
    depositAddress = "";
    withdrawalAddress = [];
    amount = 0.0;
    status = depositStatus.NOT_DEFINED;
    constructor(depositAddress, withdrawalAddress, amount, status) {
        this.depositAddress = depositAddress;
        this.withdrawalAddress = withdrawalAddress;
        this.amount = amount;
        this.status = status;
    }
    static getAllDeposits = () => {
        const existingData = fileHandler.readInputFile(cpath(application.DEPOSITFILE));
        const deposits = existingData.map((data) => new Deposit(data.depositAddress, data.withdrawalAddress, data.amount, data.status));
        return deposits;
    }
    convertToJsonObj = () =>{
        const m = {
            depositAddress: this.depositAddress,
            withdrawalAddress :this.withdrawalAddress,
            amount : ""+this.amount,
            status : this.status
        };
        return m;
    };
    save = () => {
        const deposits = Deposit.getAllDeposits();
        deposits.push(this.convertToJsonObj());
        const updatedData = deposits.map((deposit) => ({
            depositAddress: deposit.depositAddress,
            withdrawalAddress: deposit.withdrawalAddress,
            amount: deposit.amount,
            status: deposit.status,
        }));
        fileHandler.writeOutpuFile(cpath(application.DEPOSITFILE),updatedData);  
    };
    update = () => {
        const deposits = Deposit.getAllDeposits();
        const filteredDesposits = deposits.filter((deposit) => deposit.depositAddress!==this.depositAddress);
        filteredDesposits.push(this.convertToJsonObj());
        const updatedData = filteredDesposits.map((deposit) => ({
            depositAddress: deposit.depositAddress,
            withdrawalAddress: deposit.withdrawalAddress,
            amount: deposit.amount,
            status: deposit.status,
        }));
        fileHandler.writeOutpuFile(cpath(application.DEPOSITFILE),updatedData);  
    } 

}
module.exports ={
    Deposit,
    depositStatus
};