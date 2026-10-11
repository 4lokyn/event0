import bcrypt from "bcryptjs";

export const passwordHash = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
}
export const passwordCheck = async (password, hashedPassword) => {
    const valid = await bcrypt.compare(password, hashedPassword);
    return valid;
}