import httpService from "./http.service";

const usersEndPoint = "user/";

const usersService = {
    get: async () => {
        const { data } = await httpService.get(usersEndPoint);
        return data;
    }
};

export default usersService;
