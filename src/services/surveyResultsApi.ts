import { apiClient, tokenStorage } from './apiClient';
import { getUserFromJwt } from './jwt';

const MOCK_SURVEY_RESULTS_KEY = 'planp.mockSurveyResults';
const shouldUseMockSurveyResults = !import.meta.env.VITE_API_BASE_URL;

export type SurveyResultAnswers = {
    city: string;
    destination: string;
    airports: string[];
    travelTypes: string[];
    stays: string[];
    navItems: string[];
};

export type SurveyResult = {
    id: string;
    cityCode: string;
    answers: SurveyResultAnswers;
    resultType: string;
    createdAt: string;
    updatedAt: string;
};

export type SaveSurveyResultRequest = {
    cityCode: string;
    answers: SurveyResultAnswers;
    resultType?: string;
};

function getMockUserId() {
    const token = tokenStorage.get();
    return token ? (getUserFromJwt(token)?.id ?? 'guest') : 'guest';
}

function getMockSurveyResults() {
    try {
        const rawSurveyResults = localStorage.getItem(MOCK_SURVEY_RESULTS_KEY);
        return rawSurveyResults
            ? (JSON.parse(rawSurveyResults) as Record<string, Record<string, SurveyResult>>)
            : {};
    } catch {
        return {};
    }
}

function setMockSurveyResults(resultsByUser: Record<string, Record<string, SurveyResult>>) {
    localStorage.setItem(MOCK_SURVEY_RESULTS_KEY, JSON.stringify(resultsByUser));
}

export async function saveSurveyResult(request: SaveSurveyResultRequest) {
    const normalizedRequest = {
        ...request,
        cityCode: request.cityCode.trim().toLowerCase(),
    };

    if (shouldUseMockSurveyResults) {
        const userId = getMockUserId();
        const resultsByUser = getMockSurveyResults();
        const existingResult = resultsByUser[userId]?.[normalizedRequest.cityCode];
        const now = new Date().toISOString();
        const surveyResult: SurveyResult = {
            id: existingResult?.id ?? crypto.randomUUID(),
            cityCode: normalizedRequest.cityCode,
            answers: normalizedRequest.answers,
            resultType: normalizedRequest.resultType ?? '',
            createdAt: existingResult?.createdAt ?? now,
            updatedAt: now,
        };

        resultsByUser[userId] = {
            ...(resultsByUser[userId] ?? {}),
            [normalizedRequest.cityCode]: surveyResult,
        };
        setMockSurveyResults(resultsByUser);

        return surveyResult;
    }

    const { data } = await apiClient.post<{ surveyResult: SurveyResult }>(
        '/survey-results',
        normalizedRequest
    );
    return data.surveyResult;
}

export async function getSurveyResult(cityCode: string) {
    const normalizedCityCode = cityCode.trim().toLowerCase();

    if (shouldUseMockSurveyResults) {
        const resultsByUser = getMockSurveyResults();
        return resultsByUser[getMockUserId()]?.[normalizedCityCode] ?? null;
    }

    const { data } = await apiClient.get<{ surveyResult: SurveyResult | null }>(
        `/survey-results/${encodeURIComponent(normalizedCityCode)}`
    );
    return data.surveyResult;
}
