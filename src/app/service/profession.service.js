import httpService from "./http.service";

const professionsEndPoint = "profession/";

const professionsService = {
    get: async () => {
        const { data } = await httpService.get(professionsEndPoint);
        return data;
    }
};

export default professionsService;
