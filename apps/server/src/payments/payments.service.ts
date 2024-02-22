import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma-service/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}
  async storePaymentInfo(session: any) {
    try {
      console.log('session: ', session);
    } catch (error) {
      console.log(error);
    }
  }
}
