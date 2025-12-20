import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAiConfigDto, UpdateAiConfigDto } from './dto/ai-config.dto';
import { AiConfigService } from './ai-config.service';

@Controller('ai-config')
@UseGuards(JwtAuthGuard)
export class AiConfigController {
    constructor(private readonly aiConfigService: AiConfigService) { }

    @Get()
    async findAll() {
        return this.aiConfigService.findAll();
    }

    @Get('active')
    async findActive() {
        return this.aiConfigService.findActive();
    }

    @Get('active/all')
    async findAllActive() {
        return this.aiConfigService.findAllActive();
    }

    @Get('stats')
    async getUsageStats() {
        const configs = await this.aiConfigService.findAllActive();
        return configs.map(config => ({
            id: config._id,
            provider: config.provider,
            modelName: config.modelName,
            usageCount: config.usageCount || 0,
            lastUsed: config.lastUsed || 0,
            isActive: config.isActive
        }));
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.aiConfigService.findOne(id);
    }

    @Post()
    async create(@Body() createAiConfigDto: CreateAiConfigDto) {
        return this.aiConfigService.create(createAiConfigDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAiConfigDto: UpdateAiConfigDto) {
        return this.aiConfigService.update(id, updateAiConfigDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.aiConfigService.remove(id);
    }

    @Put(':id/activate')
    async activate(@Param('id') id: string) {
        return this.aiConfigService.activate(id);
    }
}