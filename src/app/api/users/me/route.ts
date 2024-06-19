import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest){

    //extract data from token
    const userId = await getDataFromToken(request)
    
    const user = User.findOne({_id: userId}).select("-password")

    //check if there is no user

    return NextResponse.json({
        message: "User found",
        data: user
    })

}