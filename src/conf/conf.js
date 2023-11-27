const conf = {
    APPWRITE_URL : String(import.meta.env.VITE_APPWRITE_URL),
    APPWRITE_PROJECTID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    APPWRITE_DATABASE_ID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    APPWRITE_COLLECTION_ID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    APPWRITE_BUCKET_ID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),


    // APPWRITE_URL : String("https://cloud.appwrite.io/v1"),
    // APPWRITE_PROJECTID : String("6535f0ed37dbe90ff4f1"),
    // APPWRITE_DATABASE_ID : String("6535f1d5bb1bf93e0c1e"),
    // APPWRITE_COLLECTION_ID : String("6535f203f40e5c76b234"),
    // APPWRITE_BUCKET_ID : String("6535f4084bae420b71ed"),
}

export default conf