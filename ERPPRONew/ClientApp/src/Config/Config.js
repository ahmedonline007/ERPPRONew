import CryptoJS from 'crypto-js';

const IsAllow = (code) => {

    let objUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (objUserInfo.isAdmin === true) {
        return true;
    } else {
        let permission = JSON.parse(localStorage.getItem("Permission"));

        const allow = permission.findIndex(x => x === code);

        if (allow > -1) {
            return true;
        } else {
            return false;
        }
    }
}

const encrypt = (code) => {
    // PROCESS
    const encryptedWord = CryptoJS.enc.Utf8.parse(code);
    const encrypted = CryptoJS.enc.Base64.stringify(encryptedWord);
    return encrypted;

}


const decrypt = (code) => {

    // PROCESS
    const encryptedWord = CryptoJS.enc.Base64.parse(code); // encryptedWord via Base64.parse()
    const decrypted = CryptoJS.enc.Utf8.stringify(encryptedWord); // decrypted encryptedWord via Utf8.stringify() 
    return decrypted;
}

const defaultURLAPI = () => {
    return "api/ERP"
}

const defaultURLAPITOKEN = () => {
    return "api/Token"
}



export default { IsAllow, encrypt, decrypt, defaultURLAPI, defaultURLAPITOKEN };