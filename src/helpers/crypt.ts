import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import Vars from "./variables";

export const encrypt = (word: string) => {

    return new URLSearchParams(Base64.stringify( hmacSHA512(word, Vars.PRIVATE_KEY))).toString();
}

export const getUniqueId = () => {
    return `${new Date().getTime()}`;
}
