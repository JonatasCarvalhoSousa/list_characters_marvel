import axios from 'axios';
import md5 from 'md5';

const publicKey = 'dfec76eec21988918668a81c32ee52b2';
const privateKey = 'c33aaf0c52656ccb95e0b0c529f4d6ae3ac004a7';

const ts = Number(new Date());

const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public/',
    params: {
        ts,
        apikey: publicKey,
        hash,
    },
});

export default api;