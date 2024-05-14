import { Schema, model } from 'mongoose';
import {
  battingStyle,
  bowlingArm,
  bowlingStyle,
  role,
} from './player.constants';
import { IPlayer } from './player.interface';

const playerSchema = new Schema<IPlayer>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: role,
      required: true,
    },
    battingStyle: {
      type: String,
      enum: battingStyle,
      required: true,
    },
    bowlingArm: {
      type: String,
      enum: bowlingArm,
      default: 'Right-arm',
    },
    bowlingStyle: {
      type: String,
      enum: bowlingStyle,
      default: 'Fast',
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
  },
  {
    timestamps: true,
  },
);

export const Player = model('Player', playerSchema);
