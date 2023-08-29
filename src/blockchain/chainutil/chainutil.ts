import { v1 as uuidv1 } from 'uuid';
import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id(): string {
        return uuidv1();
    }

    static verifySignature(publicKey: string, signature: string, dataHash: string): boolean {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}

export default ChainUtil;