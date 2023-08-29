import { v1 as uuidv1 } from 'uuid';
import { ec as EC } from 'elliptic';
import CryptoJS from 'crypto-js';

const ec = new EC('secp256k1');

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id(): string {
        return uuidv1();
    }

    static hash(data: any): string {
        return CryptoJS.SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey: string, signature: string, dataHash: string): boolean {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}

export default ChainUtil;