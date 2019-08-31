import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { updateUser, stateData, setVoteCard } from "./index";

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
    let index = -1;
    comments.forEach((element, i) => {
      if (element._id === comment._id) index = i;
    });

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

export const upvoteCommentForOneVoteCard = comment => {
  return (dispatch, getState) => {
    const data = { ...getState().voteCard.voteCard };

    let index;
    data.comments.forEach((element, i) => {
      if (element._id === comment._id) {
        index = i;
      }
    });
    const indexOfUser = data.comments[index].upvotedUsers.indexOf(
      getState().user.data._id
    );
    if (indexOfUser !== -1) {
      data.comments[index].upvote--;
      data.comments[index].upvotedUsers.splice(indexOfUser);
    } else {
      data.comments[index].upvote++;
      data.comments[index].upvotedUsers.push(getState().user.data._id);
    }

    dispatch(setVoteCard(data));
  };
};

export const addCommentForOneVoteCard = comment => {
  return async (dispatch, getState) => {
    const { data: newComment } = await http.post(apiEndpoint, comment);
    newComment.owner = comment.owner;

    const data = { ...getState().voteCard.voteCard };

    data.comments.push(newComment);

    dispatch(setVoteCard(data));

    let user = { ...getState().user.data };
    user.numberOfComment = user.numberOfComment + 1;
    dispatch(updateUser(user));
  };
};
