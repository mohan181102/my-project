import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice{
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.APPWRITE_PROJECTID)
        
        // add client in account

        this.account = new Account(this.client);
    }

    // promise for account

    async createaccount({email,password,name}){
        try{
            const useraccount = await this.account.create(ID.unique(),email,password,name)
            if(useraccount){
                return this.login({email,password})
            }else{
                return useraccount;
            }
        }catch(e){
            console.log(`error from createaccount: ${e}`)
        }
    }

    // login function

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password)
        }catch(e){
            console.log(`error from login: ${e}`)
        }
    }

    async getcurrentuser(){
        try {
            return await this.account.get();
        } catch (e) {
            console.log("error from getcurrenuser:- ",e)
                       
        }
        return null;
    }

    async Logout(){
        try {
            return await this.account.deleteSessions(); 
        } catch (e) {
            console.log('error from logout:Auth',e)
            
        }
    }   

}
const authservice = new Authservice();

export default authservice;