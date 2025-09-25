import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphController } from './graph/graph.controller';
import { GraphService } from './graph/graph.service';

@Module({
  imports: [],
  controllers: [AppController, GraphController],
  providers: [AppService, GraphService],
})
export class AppModule {}
