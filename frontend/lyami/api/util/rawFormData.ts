import crypto from 'crypto'
import { Buffer } from 'buffer';

export interface FormDataHeader{
    'Content-Type': string,
    'Content-Length': number
}

export class RawFormData {
    constructor() {
        this.boundary = crypto.createHash('md5').update('' + (new Date)).digest('hex');
        this.rawboundary = '--' + this.boundary;
        this.data = [];
    }
    
    public data: Buffer [];
    private rawboundary: string;
    public boundary: string;
    private CRLF = '\r\n';

    /**
     * 增加字段
     * @param key 
     * @param value 
     * @returns 
     */
    addField(key: string, value: string): RawFormData {
        const buffer = Buffer.from([
            this.rawboundary,
            'Content-Disposition: form-data; name="' + key + '";' + this.CRLF,
            value + this.CRLF
        ].join(this.CRLF), 'ascii');
        this.data.push(buffer);
        return this;
    }
    
    /**
     * 增加文件
     * @param name 'file'
     * @param file 文件内容
     * @param filename 文件名
     * @param mime mime，图片为 image/png ，其他的类型去mime对应的网站上找，默认为 application/octet-stream
     * @returns 
     */
    addFile(name: string, file: Buffer, mime: string): RawFormData {
        try {
            const buffer = Buffer.from([
                this.rawboundary,
                'Content-Disposition: form-data; name="' + name + '"',
                'Content-Type: ' + (mime || 'application/octet-stream') + this.CRLF + this.CRLF
            ].join(this.CRLF), 'ascii');
    
            this.data.push(buffer);
            this.data.push(file);
            this.data.push(Buffer.from(this.CRLF));
            return this;
        }
        catch(e) {
            console.error(__filename, e);
        }
    }

    getBuffer() : Buffer {
        let buffer: Buffer[] = [];
        console.log(this.data.length);
        for (let i = 0; i < this.data.length; i++) {
            buffer.push(this.data[i]);
        }

        buffer.push(Buffer.from(this.rawboundary + '--', 'ascii'));

        return Buffer.concat(buffer);
    }

    getHeader() : FormDataHeader {
        return {
            'Content-Type': 'multipart/form-data; boundary="' + this.boundary.substring(2) + '"',
            'Content-Length': this.getBuffer().byteLength
        }
    }

    getString(): string {
        const buffer = this.getBuffer();
        return buffer.toString('utf8');
    }
}