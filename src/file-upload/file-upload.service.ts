import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BufferedFile } from './file.model';
import { v4 as uuidv4 } from 'uuid';

import * as Minio from 'minio'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
    private minioClient: Minio.Client
    private bucketName: string
    constructor(
        private readonly configService: ConfigService
    ) {
        this.minioClient = new Minio.Client({
            endPoint: this.configService.get('MINIO_ENDPOINT'),
            port: Number(this.configService.get('MINIO_PORT')),
            useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
            accessKey: this.configService.get('MINIO_ACCESS_KEY'),
            secretKey: this.configService.get('MINIO_SECRET_KEY')
        })
        this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
    }

    async createBucketIfNotExists() {
        const bucketExists = await this.minioClient.bucketExists(this.bucketName)
        if (!bucketExists) {
            await this.minioClient.makeBucket(this.bucketName, 'campuscanteen');
        }
    }

    async uploadSingle(image: BufferedFile) {
        const fileName = uuidv4() + '.png';
        this.minioClient.putObject(this.bucketName, fileName, image.buffer, function (err, res) {
            if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
        })
        return {
            statusCode: "success",
            image_url: `${fileName}`,
            message: "Successfully uploaded to MinIO S3"
        }
    }
}
