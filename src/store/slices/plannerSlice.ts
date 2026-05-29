import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type PlannerState = {
    selectedRegion: string;
    pace: 'loose' | 'balanced' | 'dense';
    avoidPlanningLevel: number;
};

const initialState: PlannerState = {
    selectedRegion: '서울',
    pace: 'balanced',
    avoidPlanningLevel: 7,
};

const plannerSlice = createSlice({
    name: 'planner',
    initialState,
    reducers: {
        setSelectedRegion(state, action: PayloadAction<string>) {
            state.selectedRegion = action.payload;
        },
        setPace(state, action: PayloadAction<PlannerState['pace']>) {
            state.pace = action.payload;
        },
        setAvoidPlanningLevel(state, action: PayloadAction<number>) {
            state.avoidPlanningLevel = action.payload;
        },
    },
});

export const { setAvoidPlanningLevel, setPace, setSelectedRegion } = plannerSlice.actions;
export default plannerSlice.reducer;
