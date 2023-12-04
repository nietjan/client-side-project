import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NOTFOUND } from 'dns';
import { DbRegistration } from './registration.schema';
import { DeleteResult } from 'mongodb';
import { UpdateWriteOpResult } from 'mongoose';
import { RegistrationService } from './registration.services';
import { CreateRegistrationDTO } from '@client-side/backend/dto';
import { IRegistration, ICreateRegistration } from '@client-side/shared/api';
import { DbUser } from '../user/user.schema';
import { AuthGuard } from '../auth/guards/auth.guards';

//TODO: add all ApiResponses
@ApiTags('registration')
@Controller('registration')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Get('')
  //for auth use ApiHeader
  @ApiOperation({ summary: 'Get all registration' })
  @ApiResponse({
    status: 200,
    description: 'Succesfully returns all registrations',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    description: 'Id of user',
    required: false,
  })
  @ApiQuery({
    name: 'locationId',
    type: String,
    description: 'Id of location',
    required: false,
  })
  @ApiQuery({
    name: 'abonnementId',
    type: String,
    description: 'Id of abonnement',
    required: false,
  })
  async getAll(
    @Query('userId') userId?: string,
    @Query('locationId') locationId?: string,
    @Query('abonnementId') abonnementId?: string
  ): Promise<DbRegistration[] | DbRegistration> {
    try {
      //if result is array of 1 return it as a object else return as array
      const result = await this.registrationService.get();

      //if al three query's have values than only 1 value is possible, so return a object instead of a array
      if (
        userId != undefined &&
        locationId != undefined &&
        abonnementId != undefined
      ) {
        if (result.length == 1) {
          return result[0];
        } else {
          throw new HttpException(
            'Registration cannot be found',
            HttpStatus.NOT_FOUND
          );
        }
      } else {
        return result;
      }
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Create registration' })
  @ApiBody({ type: CreateRegistrationDTO })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() data: CreateRegistrationDTO,
    @Request() req: any
  ): Promise<DbRegistration> {
    try {
      return await this.registrationService.create(data, req['user'].user_id);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete('')
  @ApiOperation({ summary: 'Delete registration' })
  @ApiQuery({
    name: 'locationId',
    type: String,
    description: 'Id of location',
    required: true,
  })
  @ApiQuery({
    name: 'abonnementId',
    type: String,
    description: 'Id of abonnement',
    required: true,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(
    @Request() req: any,
    @Query('locationId') locationId: string,
    @Query('abonnementId') abonnementId: string
  ): Promise<DeleteResult> {
    if (locationId == undefined || abonnementId == undefined) {
      throw new HttpException(
        'Request requires locationId and abonnementId query params',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const result = await this.registrationService.delete(
        req['user'].user_id,
        locationId,
        abonnementId
      );
      if (result.deletedCount == 0) {
        throw new HttpException(
          `Registration with combination of user, location and abonnement does not exist`,
          HttpStatus.NOT_FOUND
        );
      }
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Put('')
  @ApiOperation({ summary: 'update registration' })
  @ApiBody({ type: CreateRegistrationDTO })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async Update(
    @Body() data: CreateRegistrationDTO,
    @Request() req: any
  ): Promise<UpdateWriteOpResult> {
    try {
      const result = await this.registrationService.update(
        data,
        req['user'].user_id
      );
      if (result.modifiedCount == 0) {
        throw new HttpException(
          `Registration with combination of user, location and abonnement does not exist`,
          HttpStatus.NOT_FOUND
        );
      }
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
