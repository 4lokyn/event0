'use server'

export async function registerUser(payload) {

    await new Promise((resolve) => setTimeout(resolve, 2000))
    const isValidPayload = false;

    if(isValidPayload) {
        return {
            error: {
                title: 'Something went wrong',
                message: 'Password is bad!'
            }
        }
    }
    return { ok: true };
}