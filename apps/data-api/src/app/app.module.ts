import { Module } from '@nestjs/common';
import { LocationModule, UserModule } from '@client-side/backend/features';

@Module({
  imports: [LocationModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
