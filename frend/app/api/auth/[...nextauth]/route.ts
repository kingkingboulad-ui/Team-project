//file li byesta2ebel  fiya operation signin and signout ,  sessions
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";//bi albu credentiels w google signin,jwt 

const handler = NextAuth(authOptions);//3atani function jehzeh et3mal ma3 req 
export { handler as GET, handler as POST };//handler function li btet3mal ma3 request
