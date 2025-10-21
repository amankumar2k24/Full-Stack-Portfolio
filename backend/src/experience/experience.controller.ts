import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) { }

    @Get()
    async findAll() {
        return this.experienceService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createExperienceDto: CreateExperienceDto) {
        return this.experienceService.create(createExperienceDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
        return this.experienceService.update(id, updateExperienceDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string) {
        return this.experienceService.remove(id);
    }
}