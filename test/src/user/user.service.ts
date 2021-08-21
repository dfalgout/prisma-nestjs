import { Injectable } from '@nestjs/common';
import { PrismaService } from 'generated/prisma/prisma.service';
import { UserCRUDService } from 'generated/user/user.service';

@Injectable()
export class UserService extends UserCRUDService {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }
}
