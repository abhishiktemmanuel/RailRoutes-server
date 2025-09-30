import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { GraphService } from '../graph/graph.service';

@Injectable()
export class FileLoaderService implements OnModuleInit {
  private readonly logger = new Logger(FileLoaderService.name);
  private routes: string[] = [];

  constructor(private readonly graphService: GraphService) {}

  onModuleInit() {
    this.loadRoutesFromFile();
    // Build the graph immediately after loading routes
    this.logger.log('Building graph with loaded routes...');
    this.graphService.buildGraph(this.routes);
  }

  private loadRoutesFromFile(): void {
    try {
      const filePath = join(process.cwd(), 'routes.txt');
      let fileContent = readFileSync(filePath, 'utf-8');

      // Remove BOM if present
      if (fileContent.charCodeAt(0) === 0xFEFF) {
        fileContent = fileContent.substring(1);
      }

      this.routes = fileContent
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .split('\n')
        .map((line) => line.trim())
        .map((line) => line.replace(/[^\x20-\x7E]/g, ''))
        .filter((line) => line.length > 0 && !line.startsWith('#'));

      this.logger.log(`Loaded ${this.routes.length} routes from routes.txt`);

      if (this.routes.length === 0) {
        this.logger.error('No routes loaded from file!');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Failed to load routes from file', errorMessage);
      throw new Error(
        `Could not load routes configuration file: ${errorMessage}`,
      );
    }
  }

  getRoutes(): string[] {
    return this.routes;
  }

  reloadRoutes(): void {
    this.loadRoutesFromFile();
    this.graphService.buildGraph(this.routes);
  }
}
