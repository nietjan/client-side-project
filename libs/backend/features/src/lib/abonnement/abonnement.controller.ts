import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { AbonnementService } from './abonnement.services';
import {
  CreateAbonnementDto,
  UpdateAbonnementDto,
} from '@client-side/backend/dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DbAbonnement } from './abonnement.schema';
import { DeleteResult } from 'mongodb';
import { IAbonnement, IUpdateAbonnement } from '@client-side/shared/api';
import { UpdateWriteOpResult } from 'mongoose';
import { EmployeeOnlyGuard } from '../auth/guards/employee.only.guards';

//TODO: add all ApiResponses
@ApiTags('abonnement')
@Controller('Abonnement')
export class AbonnementController {
  constructor(private AbonnementService: AbonnementService) {}

  @Get('')
  //for auth use ApiHeader
  @ApiOperation({ summary: 'Get all abonnements' })
  @ApiResponse({
    status: 200,
    description: 'Succesfully returns all abonnements',
  })
  async getAll(): Promise<DbAbonnement[]> {
    try {
      return await this.AbonnementService.getAll();
    } catch (error) {
      throw new HttpException(
        'No locations can be found',
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get abonnement with id' })
  @ApiParam({ name: 'id', description: 'Id of abonnement', type: String })
  async getOne(@Param('id') id: string): Promise<DbAbonnement> {
    try {
      let result = await this.AbonnementService.getOne(id);
      if (result != null) {
        return result;
      } else
        throw new HttpException(
          `Abonnement with id: ${id} does not exist`,
          HttpStatus.NOT_FOUND
        );
    } catch (error) {
      throw new HttpException(
        `Abonnement with id: ${id} does not exist`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Create abonnement' })
  @ApiBody({ type: CreateAbonnementDto })
  @UseGuards(EmployeeOnlyGuard)
  @ApiBearerAuth()
  async create(@Body() data: CreateAbonnementDto): Promise<DbAbonnement> {
    try {
      return await this.AbonnementService.create(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete abonnement' })
  @ApiParam({ name: 'id', description: 'Id of abonnement', type: String })
  @UseGuards(EmployeeOnlyGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    try {
      const result = await this.AbonnementService.delete(id);
      if (result.deletedCount == 0) {
        throw new HttpException(
          `Abonnement with id ${id} does not exist`,
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

  @Put(':id')
  @ApiOperation({ summary: 'Delete abonnement' })
  @ApiParam({ name: 'id', description: 'Id of abonnement', type: String })
  @ApiBody({ type: UpdateAbonnementDto })
  @UseGuards(EmployeeOnlyGuard)
  @ApiBearerAuth()
  async Update(
    @Param('id') id: string,
    @Body() Abonnement: UpdateAbonnementDto
  ): Promise<UpdateWriteOpResult> {
    try {
      const result = await this.AbonnementService.update(Abonnement, id);
      if (result.modifiedCount == 0) {
        throw new HttpException(
          `Abonnement with id ${id} does not exist`,
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
