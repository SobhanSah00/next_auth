import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request : NextRequest) => {

    try {

        const token = request.cookies.get("token")?.value || ""
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)

        //here we desined a interface also insted of write any, if it written it will be like this
        /*

        interface DecodedToken {
            id: string; // Assuming the ID is a string
        }

        */

        return decodedToken.id
        //we can do this type also

        /*
            if (decodedToken && typeof decodedToken.id === "string") {
                return decodedToken.id;
            } else {
                return null; // or throw an error if you prefer
            } 
        */

    } catch(error : any) {
        throw new Error(error.message)
    }
}

//how jsown webtoken works

/* 

Creation: When a user logs in to a website, the server generates a JWT containing some information about the user, like their user ID or role. This information is then encoded into a JSON format.

Signing: After encoding the information, the server signs the JWT using a secret key known only to the server. This signature ensures that the JWT hasn't been tampered with or altered.

Transmission: The JWT is then sent back to the client, usually as a response to the login request. The client receives the JWT and typically stores it, often in local storage or as an HTTP-only cookie.

Usage: Whenever the client makes subsequent requests to the server, it includes the JWT in the request headers. This allows the server to verify the authenticity of the user and, if needed, retrieve the user's information from the JWT without needing to store session state on the server.

 */

//what is cookies with real life example

/*  visit an online store to buy some books. When you first go to the site, it might ask if you want to stay logged in, so you don't have to enter your username and password every time you visit.

When you agree, the website creates a small file, called a cookie, and stores it on your computer. This cookie contains information like your username and preferences, such as your favorite genres of books.

Now, when you come back to the website later, it reads the cookie it left on your computer. It sees that you're already logged in and knows what kinds of books you like, so it can show you personalized recommendations or remind you of items you've looked at before.

Cookies make your experience on the website smoother and more personalized because they help the site remember you and your preferences.*/