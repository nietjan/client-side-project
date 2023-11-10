import { Module } from '@nestjs/common';
import { LocationModule } from '@client-side/backend/features';

@Module({
  imports: [LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
