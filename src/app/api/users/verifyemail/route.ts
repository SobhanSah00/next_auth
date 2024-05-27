// import { connect } from '@/dbConfig/dbConfig';
// import User from '@/models/userModel'
// import { NextRequest,NextResponse } from 'next/server'


// connect()

// export async function POST(request : NextRequest) {
//     try {

//         const reqBody = await request.json()
//         const { token } = reqBody
//         console.log(token);
         
//         const user = await User.findOne({verifyToken : token,
//             verifyTokenExpiry : {$gt : Date.now()}
//         }) 
        

//            if(!user) {
//             return NextResponse.json(
//                 {
//                     error : "invalid Token details"
//                 },
//                 {
//                     status : 400
//                 }
//             )
//            }

//            console.log(user);

//            user.isVerfied = true;
//            user.verifyToken = undefined
//            user.verifyTokenExpiry = undefined

//            await user.save()

//            return NextResponse.json(
//             {
//                 error : "Email verifyied Successfully",
//                 success : true
//             },
//             {status : 200}
//         )



//     }catch (error : any) {
//         return NextResponse.json(
//             {
//                 error : error.message
//             },
//             {
//                 status : 500
//             }
//         )
//     }
// }

import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}

/* verifyToken: token: This part of the query matches the verifyToken field of the user document with the value of the token variable. It searches for a user with the same verification token.
           verifyTokenExpiry: { $gt: Date.now() }: This part of the query checks if the verifyTokenExpiry field of the user document is greater than the current date and time (using Date.now()). It ensures that the verification token has not expired yet. The $gt operator stands for "greater than".*/