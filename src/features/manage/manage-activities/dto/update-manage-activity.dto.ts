import { PartialType } from '@nestjs/swagger';
import { CreateManageActivityDto } from './create-manage-activity.dto';

export class UpdateManageActivityDto extends PartialType(
  CreateManageActivityDto,
) {}
