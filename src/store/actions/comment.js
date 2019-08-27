import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { updateUser, stateData } from "./index";

const apiEndpoint = apiUrl + "/comments";

export const addComment = (comment, voteCardId) => {
  return async (dispatch, getState) => {
    const { data: newComment } = await http.post(apiEndpoint, comment);
    newComment.owner = comment.owner;

    const data = [...getState().voteCard.data];
    const { comments } = data.find(element => element._id === voteCardId);

    comments.push(newComment);

    dispatch(stateData(data));

    let user = { ...getState().user.data };
    user.numberOfComment = user.numberOfComment + 1;
    dispatch(updateUser(user));
  };
};

export const upvoteComment = (comment, voteCardId) => {
  return (dispatch, getState) => {
    const data = [...getState().voteCard.data];

    const { comments } = data.find(element => element._id === voteCardId);
    const index = comments.indexOf(comment);

    const indexOfUser = comments[index].upvotedUsers.indexOf(
      getState().user.data._id
    );
    if (indexOfUser !== -1) {
      comments[index].upvote--;
      comments[index].upvotedUsers.splice(indexOfUser);
    } else {
      comments[index].upvote++;
      comments[index].upvotedUsers.push(getState().user.data._id);
    }

    dispatch(stateData(data));
  };
};

export const updateComment = comment => {
  return async dispatch => {
    await http.put(apiEndpoint + "/" + comment._id, comment);
  };
};
