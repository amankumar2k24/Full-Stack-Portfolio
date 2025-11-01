"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("../schemas/message.schema");
const email_service_1 = require("../email/email.service");
let ContactService = class ContactService {
    constructor(messageModel, emailService) {
        this.messageModel = messageModel;
        this.emailService = emailService;
    }
    async create(createMessageDto) {
        const createdMessage = new this.messageModel(createMessageDto);
        const savedMessage = await createdMessage.save();
        try {
            this.emailService.sendContactNotification({
                name: createMessageDto.name,
                email: createMessageDto.email,
                message: createMessageDto.message,
            });
        }
        catch (error) {
            console.error('Failed to send email notification:', error);
        }
        return savedMessage;
    }
    async findAll() {
        return this.messageModel.find().sort({ createdAt: -1 }).exec();
    }
    async delete(id) {
        await this.messageModel.findByIdAndDelete(id).exec();
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        email_service_1.EmailService])
], ContactService);
//# sourceMappingURL=contact.service.js.map