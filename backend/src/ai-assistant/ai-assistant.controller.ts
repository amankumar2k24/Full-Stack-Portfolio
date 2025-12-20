import { Controller, Post, Body, Get } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';

@Controller('ai-assistant')
export class AiAssistantController {
    constructor(private readonly aiAssistantService: AiAssistantService) { }

    @Post('chat')
    async chat(@Body() body: { message: string }) {
        return this.aiAssistantService.processMessage(body.message);
    }

    @Get('context')
    async getContext() {
        return this.aiAssistantService.getWebsiteContext();
    }
}