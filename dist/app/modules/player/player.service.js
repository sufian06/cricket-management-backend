"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const player_constants_1 = require("./player.constants");
const player_model_1 = require("./player.model");
const createPlayer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield player_model_1.Player.create(payload);
    return result;
});
const getAllPlayers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: player_constants_1.playerFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield player_model_1.Player.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield player_model_1.Player.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSinglePlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield player_model_1.Player.findOne({ _id: id });
    return result;
});
const updatePlayer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isPlayerExist = yield player_model_1.Player.findOne({ _id: id });
    if (!isPlayerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Player not found');
    }
    const result = yield player_model_1.Player.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deletePlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield player_model_1.Player.findByIdAndDelete(id);
    return result;
});
const addMatchData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { runs,
    // notOut,
    // playedBalls,
    // highestScore,
    // average,
    // stikerate,
    // fifty,
    // thirty,
    // sixes,
    // fours,
    // overs,
    // balls,
    // wickets,
    // givenRuns,
    // economy,
     } = payload;
    const isPlayerExist = yield player_model_1.Player.findOne({ _id: id });
    if (!isPlayerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Player doest not exist');
    }
    const newHighestScore = runs && runs > isPlayerExist.highestScore
        ? runs
        : isPlayerExist.highestScore;
    const updatedMath = yield player_model_1.Player.findByIdAndUpdate(id, {
        $set: { highestScore: newHighestScore },
        $inc: {
            matches: 1,
            ininges: 1,
            runs: runs !== null && runs !== void 0 ? runs : 0,
            playedBalls: (_a = payload.playedBalls) !== null && _a !== void 0 ? _a : 0,
            sixes: (_b = payload.sixes) !== null && _b !== void 0 ? _b : 0,
            fours: (_c = payload.fours) !== null && _c !== void 0 ? _c : 0,
            balls: (_d = payload.balls) !== null && _d !== void 0 ? _d : 0,
            wickets: (_e = payload.wickets) !== null && _e !== void 0 ? _e : 0,
            givenRuns: (_f = payload.givenRuns) !== null && _f !== void 0 ? _f : 0,
        },
    }, { new: true });
    return updatedMath;
});
exports.PlayerService = {
    createPlayer,
    getAllPlayers,
    getSinglePlayer,
    updatePlayer,
    deletePlayer,
    addMatchData,
};
