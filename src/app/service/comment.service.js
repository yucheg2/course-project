import httpService from "./http.service";

const commentEndPoint = "comment/";

const commentServise = {
    createComment: async (comment) => {
        const { data } = await httpService.put(
            commentEndPoint + comment._id, comment
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndPoint, {
            params: {
                orderBy: `"pageId"`,
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    deleteComment: async (commentId) => {
        const { data } = await httpService.delete(commentEndPoint + commentId);
        return data;
    }
};

export default commentServise;
