import httpService from "./http.service";

const qualitieEndPoint = "quality/";

const qualitiesServise = {
    get: async () => {
        const { data } = await httpService.get(qualitieEndPoint);
        return data;
    }
};

export default qualitiesServise;
