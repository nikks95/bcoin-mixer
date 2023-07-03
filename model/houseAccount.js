const application = require('../util/application');
const fileHandler = require('../handler/fileHandler');
const cpath = require('../util/customPath');
const generateHouseAccount = (houseAddress,amount) => {
    mappedData = [{houseAddress:houseAddress, amount:amount}];
    fileHandler.writeOutpuFile(cpath(application.HOUSEFILE),mappedData);
};
class HouseAccount {
    houseAddress = "";
    amount=0.0
    constructor(houseAddress,amount){
        this.amount = amount;
        this.houseAddress = houseAddress;
    }
    static getAllHouseAccount = () => {
        const existingData = fileHandler.readInputFile(cpath(application.HOUSEFILE));
        const houseAccounts = existingData.map((data) => new HouseAccount(data.houseAddress,data.amount));
        return houseAccounts;
    }
    static initHouseAccount(){
        const accounts = HouseAccount.getAllHouseAccount();
        if(accounts.length==0){
            generateHouseAccount(application.HOUSEADDRESS,0.0);
        }
    }
    
    
    static findHouseAccountByAddress = (address) =>{
        const existingData =this.getAllHouseAccount();
        return existingData.find((account => account.houseAddress === address)); 
    }
    convertToJsonObj = () =>{
        const m = {
            houseAddress:this.houseAddress,
            amount : this.amount
        };
        return m;
    };
    
    update = () => {
        const houseAccount = HouseAccount.getAllHouseAccount();
        const filteredhouseAccounts = houseAccount.filter((account) => account.houseAddress!==this.houseAddress);
        filteredhouseAccounts.push(this.convertToJsonObj());
        const updatedData = filteredhouseAccounts.map((address) => ({
            houseAddress: address.houseAddress,
            amount: address.amount,
          
        }));
        fileHandler.writeOutpuFile(cpath(application.HOUSEFILE),updatedData);  
    } 
};

module.exports = {
    HouseAccount
};