import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import authservice from "./Auth";


export class Authservice{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.APPWRITE_PROJECTID);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async postcreate({title,slug,conntent,featuredimg,status,userid}){
        try{
            return await this.databases.createDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    conntent,
                    featuredimg,
                    status,
                    userid,
                    
                } 
            )
        } catch(error) {
            console.log('postcreate:',error);
            
        }

    }

    async postupdate(slug,{title,content,featuredimage,status,userID}){
        try {
            return await this.databases.updateDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_COLLECTION_ID,slug,{
                title,
                content,
                status,
                featuredimage
            })
        } catch (e){
            console.log('postupdate: ',e)
            
        }
    }

    async deletepost(slug){
        try {
            await this.databases.deleteDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            )
        } catch (e) {
            console.log('delete post',e)
            
        }
    }

    async getpost(slug){
        try {
            return await this.databases.getDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            )
        } catch (e) {
            console.log('getpost: ',e)
        }
    }

    async allpost(){
        try {
            const userdata = await authservice.getcurrentuser()
            const Email = userdata.email
            return await this.databases.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                [Query.equal('userid',[Email])]
            )
        } catch (e) {
            console.log('allpost: ',e)       
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (e) {
            console.log('upload post',e)
            
        }
    }

    async filedelete(filid){
        try {
            await this.bucket.deleteFile(
                conf.APPWRITE_BUCKET_ID,
                filid
            )
            return true
        } catch (error) {
            
        }
    }

    getfile(fileId){
        return this.bucket.getFilePreview(
            conf.APPWRITE_BUCKET_ID,
            fileId
        )
    }
}

const authconfig = new Authservice()
export default authconfig