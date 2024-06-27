#! /usr/bin/env node

import inquirer from "inquirer"

// Bank Account interface
interface BankAccount{
    accountNumber:number;
    balance:number;
    withdraw(amount:number):void
   deposit(amount:number):void
  checkBalance():void
}

//Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number,balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    //Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful.Remainig balance: $${this.balance}`);
            
        }else{
            console.log("Insufficient balance");
            
        }
    }
    //credit money
    deposit(amount: number): void {
        if(amount > 100){
            amount-=1; //$1 fee charge if more then $100 is deposited.
        }this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaning balance: $${this.balance}`);
    }
    //check balance
    checkBalance(): void {
        console.log(`current blance: $${this.balance}`);
        
    }
}
//customer class
class Customer{
    firstname: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstname: string,lastName: string,gender: string,age: number,  mobileNumber: number, account: BankAccount){
        this.firstname = firstname;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

//creat bank accounts
const accounts:BankAccount[] = [
new BankAccount(1001, 500),
new BankAccount(1002, 1000),
new BankAccount(1003, 2000)
]; 
//creat customers
const customers:Customer[] = [
    new Customer("ali","khan","Male",35,3162223334,accounts[0]),
    new Customer("Asia","parveen","female", 25, 3332223334,accounts[1]),
    new Customer("Hamzah","syed","Male", 22, 3412223334,accounts[2])
]
//funcation to interect with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type: "number",
            message: "Enter your account number:"
        })
        const customer = customers.find(customer =>customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`welcome, ${customer.firstname} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit","Withdraw","Check Balance","Exit"]
            }]);
            //use switch case
            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message:"Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw":
                    const withAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message:"Enter the amount to deposit:"
                    })
                    customer.account.withdraw(withAmount.amount);
                    break;
                    case "Check Balance":
                        customer.account.checkBalance();  
                        break;
                        case "Exit":
                            console.log("Exciting bank programe...");
                            console.log("\n Thanku for using our bank services. Have a great day!");
                            return;
                            
                            
                        }
            
            
                        
                    }else{
                        console.log("Invalid account number.Please try again.");
                        
                    }
                }while(true)
            }
            service();



                     
        
