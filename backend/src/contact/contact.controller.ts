import { Controller, Get, Post, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateMessageDto } from './dto/message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    async create(@Body() createMessageDto: CreateMessageDto) {
        return this.contactService.create(createMessageDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.contactService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.contactService.delete(id);
        return { message: 'Message deleted successfully' };
    }
}