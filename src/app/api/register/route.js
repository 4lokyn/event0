
import User from "@/lib/models/user";
import DBconnect from "@/lib/db";
import {passwordHash} from "@/utils/password";

export async function POST(request) {
    const { email, password } = await request.json();

    await DBconnect();

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return Response.json({error: 'Email already in use!'}, {status: 500})
    }

    const hashedPassword = await passwordHash(password);

    const newUser = new User({
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        return Response.json({user: newUser}, {status: 200})
    } catch(e) {
        return Response.json({error: 'Something went wrong'}, {status: 500})
    }
}