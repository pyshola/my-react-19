import { Client, Databases, ID, Query } from "appwrite"
const PROJECT_ID  = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client().setProject(PROJECT_ID).setEndpoint('https://cloud.appwrite.io/v1')

const database = new Databases(client)

export const updateSearchCount = async(searchTerm, movie) =>{
    console.log(movie)
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,
           [Query.equal('search_term',searchTerm)]
        )
        if(result.documents.length > 0){
            const doc = result.documents[0]
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, 
                {count:doc.count + 1})
        }
        else{
            await database.createDocument(DATABASE_ID, COLLECTION_ID,ID.unique(), 
                {search_term:searchTerm, count:1, movie_id:movie.id,
                    poster_url:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                }

            )
        }
    }catch(error){
        console.log(`appwrite query error ${error}`)
    }
}

export const getTrendingMovie = async()=>{
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('count'),
            Query.limit(5)
        ])

        return result.documents

    }catch(error)
    {
        console.log(error)
    }
}