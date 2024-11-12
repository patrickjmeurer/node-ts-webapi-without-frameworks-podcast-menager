import { URLSearchParams } from "url";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcastAddRating } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";


export const serviceAddEpisodeRatings = async (
    url: string | undefined
): Promise<PodcastTransferModel> => {
    let responseFormat: PodcastTransferModel = {
        statusCode: 0,
        body: [],
    };

    const params = new URLSearchParams(url?.split("?")[1]);
    const videoId = params.get("v") || "";
    const rating = params.get("r") || "";

    const data = await repositoryPodcastAddRating(videoId, parseInt(rating));

    responseFormat = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
        body: data,
    };
    
    return responseFormat;
};