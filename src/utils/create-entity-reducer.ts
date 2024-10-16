import {
  createSlice,
  Draft,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";

interface Entity {
  id: string;
}

export interface EntityState<T extends Entity> {
  byId: { [key: string]: T };
  allIds: string[];
  loading: boolean;
  error?: string;
}

type DefaultReducers<T extends Entity> = {
  addEntity: (state: Draft<EntityState<T>>, action: PayloadAction<T>) => void;
  updateEntity: (
    state: Draft<EntityState<T>>,
    action: PayloadAction<T>
  ) => void;
  deleteEntity: (
    state: Draft<EntityState<T>>,
    action: PayloadAction<string>
  ) => void;
  addEntities: (
    state: Draft<EntityState<T>>,
    action: PayloadAction<T[]>
  ) => void;
};

export interface SliceOptions<
  T extends Entity,
  Reducers extends SliceCaseReducers<EntityState<T>>
> {
  name: string;
  initialState?: Partial<EntityState<T>>;
  reducers?: Reducers;
  // eslint-disable-next-line
  extraReducers?: any;
}

export const createEntityReducer = <
  T extends Entity,
  // eslint-disable-next-line
  Reducers extends SliceCaseReducers<EntityState<T>> = {}
>(
  options: SliceOptions<T, Reducers>
) => {
  const { name, initialState, reducers, extraReducers } = options;

  const initialStateWithDefaults: EntityState<T> = {
    byId: {},
    allIds: [],
    loading: false,
    ...initialState,
  };

  const defaultReducers: DefaultReducers<T> = {
    addEntity: (state, action) => {
      const entity = action.payload;
      if (!state.byId[entity.id]) {
        state.byId[entity.id] = entity as Draft<T>;
        state.allIds.push(entity.id);
      }
    },
    updateEntity: (state: Draft<EntityState<T>>, action: PayloadAction<T>) => {
      const entity = action.payload;
      if (state.byId[entity.id]) {
        state.byId[entity.id] = entity as Draft<T>;
      }
    },
    deleteEntity: (
      state: Draft<EntityState<T>>,
      action: PayloadAction<string>
    ) => {
      const id = action.payload;
      if (state.byId[id]) {
        delete state.byId[id];
        state.allIds = state.allIds.filter((eId) => eId !== id);
      }
    },
    addEntities: (state: Draft<EntityState<T>>, action: PayloadAction<T[]>) => {
      action.payload.forEach((entity) => {
        if (!state.byId[entity.id]) {
          state.byId[entity.id] = entity as Draft<T>;
          state.allIds.push(entity.id);
        }
      });
    },
  };

  return createSlice({
    name,
    initialState: initialStateWithDefaults,
    reducers: {
      ...defaultReducers,
      ...reducers,
    } as ValidateSliceCaseReducers<
      EntityState<T>,
      typeof defaultReducers & Reducers
    >,
    extraReducers,
  });
};
