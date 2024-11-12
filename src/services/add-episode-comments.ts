import { URLSearchParams } from "url";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcastAddComment } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";


export const serviceAddEpisodeComments = async (
    url: string | undefined
): Promise<PodcastTransferModel> => {
    let responseFormat: PodcastTransferModel = {
        statusCode: 0,
        body: [],
    };
    
    const params = new URLSearchParams(url?.split("?")[1]);
    const videoId = params.get("v") || "";
    const user = params.get("u") || "";
    const comment = params.get("c") || "";

    const data = await repositoryPodcastAddComment(videoId, user, comment);

    responseFormat = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
        body: data,
    };
    
    return responseFormat;
};