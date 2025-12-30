import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, ReorderProjectsDto } from './dto/project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Get()
    async findAll() {
        return this.projectsService.findActive();
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async findAllForAdmin() {
        return this.projectsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('reorder')
    async reorder(@Body() reorderDto: ReorderProjectsDto) {
        return this.projectsService.reorder(reorderDto.projectIds);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}