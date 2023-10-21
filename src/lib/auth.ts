import { account } from '@/lib/appwrite'
import { ID } from 'appwrite'

export async function logIn(email: string) {
    const data = await account.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`)
    return data;
}

export interface VerifySessionOptions{
    userId: string;
    secret: string;
}

export async function verifySession( {userId, secret}: VerifySessionOptions) {
    const data = await account.updateMagicURLSession(userId, secret);
    return data;
}

export async function getCurrentSession(){
    const session = account.getSession('current');
    return {
        session
    }
}

export async function deleteCurrentSession() {
    await account.deleteSession('current');
}