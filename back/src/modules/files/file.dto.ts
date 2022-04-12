import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../common/base.dto';
import { GenericResponse } from '../../common/generic-response';
import { BaseSearchResponse } from '../../common/search-response';

export class FileDto extends BaseDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  originalname: string;
  @ApiProperty()
  path: string;
  @ApiPropertyOptional()
  userId?: string;
}

export class GetFileResponse extends GenericResponse {
  @ApiProperty({ type: () => FileDto })
  file: FileDto;
}

export class GetFilesResponse extends BaseSearchResponse {
  @ApiProperty({ type: () => FileDto, isArray: true })
  files: FileDto[] = [];
}
