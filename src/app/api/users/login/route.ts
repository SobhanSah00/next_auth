import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()



export async function POST(request : NextRequest) { 

    try {

        const reqBody = await request.json()
        const { email, password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})

        if(!user) {
            return  NextResponse.json({error : "User does not exist"},
                {status : 400}
            )
        }

        console.log("User exist");

        const validPassword = await bcryptjs.compare(password, user.password)
        
        if(!validPassword) {
            return  NextResponse.json({error : "Check your Credential"}, //checking password
                {status : 400}
            )
        }

        const tokenData = { //here we can add also typesaftery interface
            id : user._id,
            email : user.email,
            username : user.username

        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{ expiresIn : '1d'})

        const response = NextResponse.json({  ////here we can add also typesaftery interface
            message : "Logged in Success",
            success : true
        })

        response.cookies.set("token",token, {
            httpOnly : true
        })

        return response

    } catch(error : any) {
        return NextResponse.json({error : error.message},
            {status : 500}
        )
    }

}

// if we desgined interface for tokendata,and destruction code of reqbody of email and password and 
// and for respornce also , these are like this

/*

    interface LoginRequestBody {
        email: string;
        password: string;
    }

    interface TokenData {
        id: string;
        email: string;
        username: string;
    }

    interface LoginResponse {
        message: string;
        success: boolean;
    }


*/