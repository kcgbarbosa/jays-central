import type {
  GameResponseDTO,
  SeasonResponseDTO,
  RecordsResponseDTO,
  RosterResponseDTO,
} from '../types/dto/mlb.dto';
import type { Game, Season } from '../types/models/game.model';
import { getHeroGameDateUtil } from '../utils/dateAndTimeUtilities';

import {
  alTeamRecordsDataModelMapper,
  rosterDataModelMapper,
  scheduleDataModelMapper,
  seasonDataModelMapper,
} from '../utils/dtoToModelMappers';

const BASE_URL = import.meta.env.VITE_MLB_BASE_URL;
const TEAM_ID = import.meta.env.VITE_BLUEJAYS_TEAMID;
const SEASON_DATA_URL = `${BASE_URL}/seasons?sportId=1`;

export async function fetchSeasonData() {
  const response = await fetch(SEASON_DATA_URL);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as SeasonResponseDTO;
  const formattedResult = seasonDataModelMapper(result);
  return formattedResult;
}

export async function fetchSchedule(seasonData: Season[]) {
  const data = seasonData[0];
  if (data === undefined) {
    throw new Error('seasonData is undefined');
  }
  const FULL_TEAM_SCHEDULE = `${BASE_URL}/schedule?sportId=1&teamId=${TEAM_ID}&startDate=${data.springStartDate}&endDate=${data.postSeasonEndDate}`;
  const response = await fetch(FULL_TEAM_SCHEDULE);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as GameResponseDTO;
  const formattedResult = scheduleDataModelMapper(result);
  return formattedResult;
}

async function fetchGameData(url: string): Promise<Game | null> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as GameResponseDTO;
  const formattedResult = scheduleDataModelMapper(result);
  return formattedResult[0];
}

export async function fetchHeroGameData(
  scheduleData: Game[]
): Promise<Game | null> {
  if (scheduleData === undefined) {
    console.error('scheduleData is undefined');
    return null;
  }
  const heroGame = getHeroGameDateUtil(scheduleData);
  if (heroGame?.gamePk === undefined) {
    console.error('no gamePk found');
    return null;
  }
  const PRE_GAME_DATA = `${BASE_URL}/schedule/?sportId=1&gamePk=${heroGame?.gamePk}&hydrate=probablePitcher`;
  const LIVE_GAME_DATA = `${BASE_URL}/schedule/?sportId=1&gamePk=${heroGame?.gamePk}&hydrate=linescore`;
  const POST_GAME_DATA = `${BASE_URL}/schedule/?sportId=1&gamePk=${heroGame?.gamePk}&hydrate=decisions`;
  switch (heroGame?.abstractGameState) {
    case 'Preview': {
      const gamePreviewData = await fetchGameData(PRE_GAME_DATA);
      return gamePreviewData;
    }
    case 'Live': {
      const gameLiveData = await fetchGameData(LIVE_GAME_DATA);
      return gameLiveData;
    }
    case 'Final': {
      const gameFinalResultData = await fetchGameData(POST_GAME_DATA);
      return gameFinalResultData;
    }
    default: {
      console.warn(
        `Unexpected abstractGameState: ${heroGame?.abstractGameState}`
      );
      return null;
    }
  }
}

export async function fetchALTeamRecords() {
  const season = new Date().getFullYear();
  const AL_STANDINGS_URL = `${BASE_URL}/standings?leagueId=103&season=${season}&standingsTypes=regularSeason`;
  const response = await fetch(AL_STANDINGS_URL);
  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }
  const result = (await response.json()) as RecordsResponseDTO;
  const formattedResult = alTeamRecordsDataModelMapper(result);
  return formattedResult;
}

export async function fetchRosterData() {
  const season = new Date().getFullYear();
  const response = await fetch(
    `${BASE_URL}/teams/${TEAM_ID}/roster?rosterType=40Man&season=${season}&hydrate=person(stats(group=[hitting,pitching],type=[season],season=${season})%3A%29`
  );

  if (!response.ok) {
    throw new Error(`response status: ${response.status}`);
  }

  const result = (await response.json()) as RosterResponseDTO;
  const formattedResult = rosterDataModelMapper(result);
  return formattedResult;
}
