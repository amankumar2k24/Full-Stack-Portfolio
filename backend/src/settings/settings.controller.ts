import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get()
    async findAll() {
        return this.settingsService.findAll();
    }

    @Get(':key')
    async findByKey(@Param('key') key: string) {
        return this.settingsService.findByKey(key);
    }

    @Put(':key')
    @UseGuards(JwtAuthGuard)
    async updateByKey(@Param('key') key: string, @Body() body: { value: string }) {
        return this.settingsService.updateByKey(key, body.value);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() body: { key: string; value: string; description?: string; type?: string }) {
        return this.settingsService.create(body.key, body.value, body.description, body.type);
    }
}