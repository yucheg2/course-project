import httpService from "./http.service";

const usersEndPoint = "user/";

const usersService = {
    get: async () => {
        const { data } = await httpService.get(usersEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(usersEndPoint + payload._id, payload);
        return data;
    }
};

export default usersService;
