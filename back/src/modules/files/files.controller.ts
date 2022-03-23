import { Body, Controller, Get, HttpCode, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Like } from 'typeorm';
import { AuthToolsService } from '../../auth/services/tools.service';
import { AppErrorWithMessage } from '../../base/app-error';
import { BaseSearchRequest } from '../../base/base-search-request';
import { BaseController } from '../../base/base.controller';
import { GenericResponse } from '../../base/generic-response';
import { FileDto, GetFileResponse, GetFilesResponse } from './file-dto';
import { File } from './file.entity';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController extends BaseController {
    constructor(
        private readonly filesService: FilesService,
        private readonly authToolsService: AuthToolsService,

    ) {
        super();
    }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all file', operationId: 'getAllFiles' })
    @ApiResponse({ status: 200, description: 'Get all file', type: GetFilesResponse })
    @HttpCode(200)
    async getAll(@Body() request: BaseSearchRequest): Promise<GetFilesResponse> {
        const findOptions = BaseSearchRequest.getDefaultFindOptions<File>(request);
        if (request.search) {
            if (!findOptions.where)
                findOptions.where = [{}];
            findOptions.where = [
                {
                    userId: Like('%' + request.search + '%'),
                },
            ]
        }
        return await this.filesService.findAll(findOptions);
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get file', operationId: 'getFile' })
    @ApiResponse({ status: 200, description: 'Get file', type: GetFileResponse })
    @HttpCode(200)
    async get(@Param('id') id: string): Promise<GetFileResponse> {
        return await this.filesService.findOne({ where: { id: id } });
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create or update file', operationId: 'createOrUpdateFile' })
    @ApiResponse({ status: 200, description: 'Create or update file', type: GetFileResponse })
    @HttpCode(200)
    async createOrUpdate(@Body() file: FileDto): Promise<GetFileResponse> {
        let response = new GetFileResponse();
        try {
            if (!file)
                throw new AppErrorWithMessage('Invalid Request');
            response = await this.filesService.createOrUpdate(file);
        } catch (error) {
            response.handleError(error);
        }
        return response;
    }

    @Post('uploadSingle')
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    @ApiOperation({ summary: 'Upload a file', operationId: 'UploadFile' })
    @ApiResponse({ status: 200, description: 'Upload a file', type: GenericResponse })
    @HttpCode(200)
    async uploadSingle(@UploadedFile() file): Promise<GenericResponse> {
        const response = new GenericResponse();
        try {
            console.log(file);
            response.success = true;
        } catch (error) {
            response.handleError(error);
        }
        return response;
    }
}