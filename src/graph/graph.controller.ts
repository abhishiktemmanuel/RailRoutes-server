import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { GraphService } from './graph.service';
import { RouteDto } from './dto/route.dto';
import { ShortestRouteDto } from './dto/shortest-route.dto';
import { FileLoaderService } from '../config/file-loader.service';

@Controller('graph')
export class GraphController {
  constructor(
    private readonly graphService: GraphService,
    private readonly fileLoaderService: FileLoaderService,
  ) {}
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

  // New endpoint for Question 6: Trips with max stops
  @Get('trips/max-stops')
  getTripsWithMaxStops(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('maxStops') maxStops: number,
  ): { count: number } {
    const count = this.graphService.countTripsWithMaxStops(
      start,
      end,
      maxStops,
    );
    return { count };
  }

  // New endpoint for Question 7: Trips with exact stops
  @Get('trips/exact-stops')
  getTripsWithExactStops(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('exactStops') exactStops: number,
  ): { count: number } {
    const count = this.graphService.countTripsWithExactStops(
      start,
      end,
      exactStops,
    );
    return { count };
  }

  @Get('trips/max-distance')
  getTripsWithMaxDistance(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('maxDistance') maxDistance: number,
  ): { count: number } {
    const count = this.graphService.countTripsWithMaxDistance(
      start,
      end,
      maxDistance,
    );
    return { count };
  }

  @Post('reload-routes')
  reloadRoutes(): { message: string; routeCount: number } {
    this.fileLoaderService.reloadRoutes();
    const routes = this.fileLoaderService.getRoutes();
    return {
      message: 'Routes reloaded successfully',
      routeCount: routes.length,
    };
  }
}
