import NextAuth from 'next-auth'
import Users from '../../../model/schema'
import {compare} from 'bcryptjs'
import connectMongo from '../../../database/coonection'
import CredentailsProvider from 'next-auth/providers/credentials'
import GithubProvider from'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'






export default NextAuth({
    providers:[
        // google provider
        GoogleProvider({
            clientId:process.env.GOOGLE_id,
            clientSecret:process.env.GOOGLE_secret
        }),
        // github provider
        GithubProvider({
            clientId:process.env.GITHUB_id,
            clientSecret:process.env.GITHUB_secret
        }),
        // custom credentails
        CredentailsProvider({
            name:"Credentials",
            async authorize(credentails,req){
                connectMongo().catch(error => {error:"Connection Failed...!"})
        // check user exitence 
        const result = await Users.findOne({email :credentails.email})
        if(!result){
            throw new Error("No user found")
        }

        //  compare 
        const checkPassword = await compare(credentails.password,result.password);

        // incorrect Password
        if(!checkPassword || result.email !== credentails.email){
            throw new Error("Username or Password doesn`t match")
            }
        
        return result;
    }
        })
    ],
    secret:"hcxi07sbXGcdcCTnqd6z3qCkjm15U0yBZDI7uXZYXHM="
})