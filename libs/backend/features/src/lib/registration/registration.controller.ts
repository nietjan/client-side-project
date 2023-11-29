import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { NOTFOUND } from 'dns';
import { DbRegistration } from './registration.schema';
import { DeleteResult } from 'mongodb';
import { UpdateWriteOpResult } from 'mongoose';
import { RegistrationService } from './registration.services';

//TODO: add all ApiResponses
@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}
}
