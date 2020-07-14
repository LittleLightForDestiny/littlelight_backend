import { Module } from '@nestjs/common';
import { LoadoutService } from './loadout.service';
import { LoadoutController } from './loadout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loadout, LoadoutSchema } from 'src/schemas/loadout.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([
    {name:Loadout.name, schema:LoadoutSchema}
  ])],
  providers: [LoadoutService],
  controllers: [LoadoutController]
})
export class LoadoutModule {}
