import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(){
    return '<a href="/api"> IR A SWAGGER</a>'
  }
}