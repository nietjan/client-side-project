import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { NOTFOUND } from 'dns';
import { DbRegistration } from './registration.schema';
import { DeleteResult } from 'mongodb';
import { UpdateWriteOpResult } from 'mongoose';
import { RegistrationService } from './registration.services';
import { CreateRegistrationDTO } from '@client-side/backend/dto';
import { IRegistration, ICreateRegistration } from '@client-side/shared/api';
import { DbUser } from '../user/user.schema';

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
  async create(@Body() data: CreateRegistrationDTO): Promise<DbRegistration> {
    try {
      return await this.registrationService.create(data);
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
    name: 'userId',
    type: String,
    description: 'Id of user',
    required: true,
  })
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
  async delete(
    @Query('userId') userId: string,
    @Query('locationId') locationId: string,
    @Query('abonnementId') abonnementId: string
  ): Promise<DeleteResult> {
    if (
      userId == undefined ||
      locationId == undefined ||
      abonnementId == undefined
    ) {
      throw new HttpException(
        'Request requires userId, locationId, abonnementId query params',
        HttpStatus.BAD_REQUEST
      );
    }

    let methodParam: ICreateRegistration = {
      userId: userId,
      locationId: locationId,
      abonnementId: abonnementId,
    };
    try {
      const result = await this.registrationService.delete(methodParam);
      if (result.deletedCount == 0) {
        throw new HttpException(
          `Location with id of User: ${userId}, id of location: ${locationId} and id of abonnement ${abonnementId} does not exist`,
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
  async Update(
    @Body() data: CreateRegistrationDTO
  ): Promise<UpdateWriteOpResult> {
    try {
      const result = await this.registrationService.update(data);
      if (result.modifiedCount == 0) {
        throw new HttpException(
          `Location with userId: ${data.userId}, locationId: ${data.locationId} and abonnementId: ${data.abonnementId} does not exist`,
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
