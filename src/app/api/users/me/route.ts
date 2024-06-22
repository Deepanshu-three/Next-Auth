import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request: NextRequest){

    try {
        //extract data from token
        const userId = await getDataFromToken(request)
        
        console.log(userId)

        const user = await User.findOne({_id: userId}).select("-password")
    
        //check if there is no user
        console.log(user)
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
    
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message}, {status: 400}
    )
    }

}