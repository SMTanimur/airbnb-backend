/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { List } from './schema/list.schema';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create.list-dto';
import { GetListsDto } from './dto/get-lists.dto';
@ApiBearerAuth()
@ApiTags(List.name)
@Controller({ path: 'lists', version: '1' })
export class ListsController {
  constructor(private readonly listsService: ListsService) {}
  @ApiOperation({ summary: 'create a New List' })
  @ApiCreatedResponse({ description: 'Create a List' })
  @UseGuards(JwtGuard)
  @Post()
  createList(@Body() createListDto: CreateListDto, @Req() req) {
    createListDto.host = req.user._id;
    return this.listsService.create(createListDto);
  }

  @ApiOperation({ summary: 'Get all Listing' })
  @ApiOkResponse({ description: 'success' })
  @Get()
  async getLists(@Query() query: GetListsDto) {
    console.log(query);
    return this.listsService.getLists(query);
  }

  @ApiOperation({ summary: 'Get all Listing' })
  @ApiOkResponse({ description: 'success' })
  @Get(':id')
  async getList(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }
}
