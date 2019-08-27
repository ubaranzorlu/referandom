import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { STATE_DATA } from "./actionTypes";
import { uiFinishLoading } from "./index";

const apiEndpoint = apiUrl + "/main-cards";

export const getData = () => {
  return async dispatch => {
    const respond = await http.get(apiEndpoint);
    dispatch(stateData(respond.data));

    dispatch(uiFinishLoading());
    return respond;
  };
};

export const stateData = data => {
  return {
    type: STATE_DATA,
    data: data
  };
};

export const updateVoteCard = voteCard => {
  return async dispatch => {
    await http.put(apiEndpoint + "/" + voteCard._id, voteCard);
  };
};
