import { IncomingMessage, ServerResponse } from "http";

import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { serviceAddEpisodeComments } from "../services/add-episode-comments";
import { serviceAddEpisodeRatings } from "../services/add-episode-ratings";
import { serviceFilterEpisodes } from "../services/filter-episodes-service";
import { serviceListEpisodes } from "../services/list-episodes-service";
import { ContentType } from "../utils/content-type";

const defaultContent = { "Content-Type": ContentType.JSON };

export const getListEpisodes = async (
    req: IncomingMessage,
    res: ServerResponse
) => {
    const content: PodcastTransferModel = await serviceListEpisodes();

    res.writeHead(content.statusCode, defaultContent);
    res.write(JSON.stringify(content.body));

    res.end();
};

export const getFilterEpisodes = async (
    req: IncomingMessage,
    res: ServerResponse
) => {
    const content: PodcastTransferModel = await serviceFilterEpisodes(req.url);

    res.writeHead(content.statusCode, defaultContent);
    res.write(JSON.stringify(content.body));

    res.end();
};

export const addEpisodeComments = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const content: PodcastTransferModel = await serviceAddEpisodeComments(req.url);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};

export const addEpisodeRatings = async (
    req: IncomingMessage,
    res: ServerResponse
) => {
    const content: PodcastTransferModel = await serviceAddEpisodeRatings(req.url);

    res.writeHead(content.statusCode, defaultContent);
    res.write(JSON.stringify(content.body));

    res.end();
};