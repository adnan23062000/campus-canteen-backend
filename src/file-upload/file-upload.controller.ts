import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from './file.model';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('file')
@Controller('file-upload')
export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ) { }

    @Post('single')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({ summary: 'Upload a single file' })
    @ApiConsumes('multipart/form-data') // Specify the content type for file upload
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Single File uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'string', example: 'success' },
                image_url: { type: 'string', example: 'uuid filename' },
                message: { type: 'string', example: 'Successfully uploaded to MinIO S3' },
            },
        },
    })
    async uploadSingle(
        @UploadedFile() image: BufferedFile
    ) {
        await this.fileUploadService.createBucketIfNotExists();
        return await this.fileUploadService.uploadSingle(image)
    }
}
