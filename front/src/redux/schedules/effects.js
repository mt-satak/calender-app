import {
  schedulesSetLoading,
  schedulesFetchItem,
  schedulesAddItem,
  schedulesDeleteItem,
  schedulesAsyncFailure
} from "./actions";
import { get, post, deleteRequest } from "../../services/api";
import { formatSchedule } from "../../services/schedule";

export const asyncSchedulesFetchItem = ({ month, year }) => async dispatch => {
  // loadingをtrueにする
  dispatch(schedulesSetLoading());

  try {
    const result = await get(`schedules?month=${month}?year=${year}`);
    const formatedSchedule = result.map(r => formatSchedule(r));
    dispatch(schedulesFetchItem(formatedSchedule));
  } catch (error) {
    console.error(error);
    dispatch(schedulesAsyncFailure(err.message));
  }
};

export const asyncSchedulesAddItem = schedule => async dispatch => {
  // loadingをtrueにする
  dispatch(schedulesSetLoading());

  try {
    const body = { ...schedule, date: schedule.date.toISOString() };
    const result = await post("schedules", body);
  
    const newSchedule = formatSchedule(result);
    dispatch(schedulesAddItem(newSchedule));
  } catch (error) {
    console.error(error);
    dispatch(schedulesAsyncFailure(err.message));
  }
};

export const asyncSchedulesDeleteItem = id => async (dispatch, getState) => {
  dispatch(schedulesSetLoading());
  const currentSchedules = getState().schedules.items;

  try {
    await deleteRequest(`schedules/${id}`);

    // 成功したらローカルのstateを削除
    const newSchedules = currentSchedules.filter(s => s.id !== id);
    dispatch(schedulesDeleteItem(newSchedules));
  } catch (error) {
    console.error(error);
    dispatch(schedulesAsyncFailure(err.message));
  }
};