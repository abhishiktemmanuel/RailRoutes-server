import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { GraphService } from './graph.service';
import { RouteDto } from './dto/route.dto';
import { ShortestRouteDto } from './dto/shortest-route.dto';
import { graphRoutes } from './graph.config';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {
    this.graphService.buildGraph(graphRoutes);
  }

  @Post('distance')
  getRouteDistance(@Body() routeDto: RouteDto): { distance: number | string } {
    const distance = this.graphService.getDistance(routeDto.stations);
    return { distance };
  }

  @Get('shortest-distance')
  getShortestDistance(@Query() shortestRouteDto: ShortestRouteDto): {
    distance: number | string;
  } {
    const distance = this.graphService.getShortestDistance(
      shortestRouteDto.start,
      shortestRouteDto.end,
    );
    return { distance };
  }
}
