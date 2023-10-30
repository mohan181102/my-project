import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Authservice{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.APPWRITE_PROJECTID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async postcreate({title,slug,content,featuredimage,status,userID}){
        try {
            return await this.databases.createDocument(conf.APPWRITE_DATABASE_ID,conf.APPWRITE_COLLECTION_ID,slug,{
                title,
                content,
                featuredimage,
                status,
                userID
            })
        } catch (e) {
            console.log('postcreate:',e)
            
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
            return this.databases.getDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            )
        } catch (e) {
            console.log('getpost: ',e)
        }
    }

    async allpost(quries = [Query.equal('status','active')]){
        try {
            return this.databases.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                quries,

            )
        } catch (e) {
            console.log('allpost: ',e)       
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.APPWRITE_BUCKET_ID,
                ID.unique,
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

    getfile(fileid){
        return this.bucket.getFilePreview(
            conf.APPWRITE_BUCKET_ID,
            fileid
        )
    }
}

const authconfig = new Authservice()
export default authconfig