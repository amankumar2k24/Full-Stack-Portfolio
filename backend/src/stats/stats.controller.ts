import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStatsDto, UpdateStatsDto } from './dto/stats.dto';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor(private readonly statsService: StatsService) { }

    // Public endpoints (no auth required)
    @Get()
    async findAll() {
        return this.statsService.findAll();
    }

    @Get('key/:key')
    async findByKey(@Param('key') key: string) {
        return this.statsService.findByKey(key);
    }

    // Admin endpoints (auth required)
    @Get('admin/all')
    @UseGuards(JwtAuthGuard)
    async findAllAdmin() {
        return this.statsService.findAllAdmin();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string) {
        return this.statsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createStatsDto: CreateStatsDto) {
        return this.statsService.create(createStatsDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateStatsDto: UpdateStatsDto) {
        return this.statsService.update(id, updateStatsDto);
    }

    @Patch(':id/toggle-active')
    @UseGuards(JwtAuthGuard)
    async toggleActive(@Param('id') id: string) {
        return this.statsService.toggleActive(id);
    }

    @Patch(':id/soft-delete')
    @UseGuards(JwtAuthGuard)
    async softDelete(@Param('id') id: string) {
        return this.statsService.softDelete(id);
    }

    @Put('bulk/order')
    @UseGuards(JwtAuthGuard)
    async updateOrder(@Body() orderUpdates: { id: string; order: number }[]) {
        return this.statsService.updateOrder(orderUpdates);
    }

    @Patch('key/:key/value')
    @UseGuards(JwtAuthGuard)
    async updateValueByKey(@Param('key') key: string, @Body() body: { value: string }) {
        return this.statsService.updateValueByKey(key, body.value);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.statsService.remove(id);
    }
}