"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const mongoose_1 = require("mongoose");
const player_constants_1 = require("./player.constants");
const playerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
    },
    age: {
        type: String,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: player_constants_1.role,
        required: true,
    },
    battingStyle: {
        type: String,
        enum: player_constants_1.battingStyle,
        required: true,
    },
    bowlingArm: {
        type: String,
        enum: player_constants_1.bowlingArm,
        default: 'right-arm',
    },
    bowlingStyle: {
        type: String,
        enum: player_constants_1.bowlingStyle,
        default: 'fast',
    },
    isCaptain: {
        type: Boolean,
        default: false,
    },
    isWicketKeeper: {
        type: Boolean,
        default: false,
    },
    matches: {
        type: Number,
        default: 0,
    },
    ininges: {
        type: Number,
        default: 0,
    },
    notOut: {
        type: Number,
        default: 0,
    },
    runs: {
        type: Number,
        default: 0,
    },
    playedBalls: {
        type: Number,
        default: 0,
    },
    highestScore: {
        type: Number,
        default: 0,
    },
    average: {
        type: Number,
        default: 0,
    },
    stikerate: {
        type: Number,
        default: 0,
    },
    fifty: {
        type: Number,
        default: 0,
    },
    thirty: {
        type: Number,
        default: 0,
    },
    sixes: {
        type: Number,
        default: 0,
    },
    fours: {
        type: Number,
        default: 0,
    },
    overs: {
        type: Number,
        default: 0,
    },
    balls: {
        type: Number,
        default: 0,
    },
    wickets: {
        type: Number,
        default: 0,
    },
    givenRuns: {
        type: Number,
        default: 0,
    },
    economy: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Player = (0, mongoose_1.model)('Player', playerSchema);
