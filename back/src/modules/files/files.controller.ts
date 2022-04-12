import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Like } from 'typeorm';
import { RolesList } from '../../../../shared/shared-constant';
import { AuthToolsService } from '../../auth/services/tools.service';
import { AppErrorWithMessage } from '../../common/app-error';
import { BaseSearchRequest } from '../../common/base-search-request';
import { BaseController } from '../../common/base.controller';
import { AllowRoles } from '../../common/decorators/allow-roles.decorator';
import { ApiDocs } from '../../common/decorators/api.decorator';
import { UserLogged } from '../../common/decorators/user-logged.decorator';
import { FileDto, GetFileResponse, GetFilesResponse } from './file.dto';
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
  @AllowRoles(RolesList.Admin)
  @ApiDocs({
    summary: 'Get all files',
    operationId: 'getAllFiles',
    resStatus: HttpStatus.OK,
    resType: GetFilesResponse,
  })
  async getAll(@Body() request: BaseSearchRequest): Promise<GetFilesResponse> {
    const findOptions = BaseSearchRequest.getDefaultFindOptions<File>(request);
    if (request.search) {
      if (!findOptions.where) findOptions.where = [{}];
      findOptions.where = [{ userId: Like('%' + request.search + '%') }];
    }
    return await this.filesService.findAll(findOptions);
  }

  @Get(':id')
  @UserLogged()
  @ApiDocs({
    summary: 'Get file',
    operationId: 'getFile',
    resStatus: HttpStatus.OK,
    resType: GetFileResponse,
  })
  async get(@Param('id') id: string): Promise<GetFileResponse> {
    return await this.filesService.findOne({ where: { id: id } });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const randomName = Array(30)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${fileExtName}`);
          return randomName;
        },
      }),
    }),
  )
  @UserLogged()
  @ApiDocs({
    summary: 'Upload a file',
    operationId: 'UploadFile',
    resStatus: HttpStatus.CREATED,
    resType: GetFileResponse,
  })
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<GetFileResponse> {
    const response = new GetFileResponse();
    try {
      const payload = this.checkUserPayload(this.authToolsService);

      const fileToSave = new FileDto();
      fileToSave.name = file.filename;
      fileToSave.type = file.mimetype;
      fileToSave.path = file.path;
      fileToSave.originalname = file.originalname;
      fileToSave.userId = payload.id;

      const saveFileForUser = await this.filesService.createOrUpdate(
        fileToSave,
      );

      if (!saveFileForUser.success)
        throw new AppErrorWithMessage(saveFileForUser.message);
      response.file = saveFileForUser.file;
      response.success = true;
    } catch (error) {
      response.handleError(error);
    }
    return response;
  }
}
